import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

const REFRESH_CACHE_FLAG = '--refresh-cache';
const REFRESH_CACHE = process.argv.includes(REFRESH_CACHE_FLAG);
const CACHE_DIRECTORY = resolve('cache');

export async function getOrComputeCachedValue<T>(fileName: string, compute: () => Promise<T>): Promise<T> {
    const path = join(CACHE_DIRECTORY, fileName);
    const logPrefix = `[Cache/${fileName}]`;

    if (REFRESH_CACHE) {
        console.log(`${logPrefix} ${REFRESH_CACHE_FLAG} is present, data will be recreated`);
    } else {
        if (existsSync(path)) {
            console.log(`${logPrefix} Reading data from cache`);
            return JSON.parse(readFileSync(path, { encoding: 'utf-8' }));
        } else {
            console.log(`${logPrefix} No cache found, data will be created`);
        }
    }

    const results = await compute();

    console.log(`${logPrefix} Saving data`);
    mkdirSync(CACHE_DIRECTORY, { recursive: true });
    writeFileSync(path, JSON.stringify(results));

    return results;
}
