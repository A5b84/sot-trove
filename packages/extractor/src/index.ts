import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { fetchAllCategoryMembers, type Page } from './wiki';

const REFRESH_CACHE_FLAG = '--refresh-cache';
const REFRESH_CACHE = process.argv.includes(REFRESH_CACHE_FLAG);
const CACHE_DIRECTORY = resolve('cache');

const pages = await getPages();

async function getPages(): Promise<Page[]> {
    const cachePath = join(CACHE_DIRECTORY, 'pages.json');

    if (REFRESH_CACHE) {
        console.log(`${REFRESH_CACHE_FLAG} is present, retrieving pages`);
    } else {
        const path = join(CACHE_DIRECTORY, 'pages.json');
        if (existsSync(cachePath)) {
            console.log(`Reading pages from cache at ${cachePath}`);
            return JSON.parse(readFileSync(path, { encoding: 'utf-8' }));
        } else {
            console.log(`No cache found at ${cachePath}, retrieving pages`);
        }
    }

    const pages = await fetchAllCategoryMembers('Treasure');

    console.log(`Caching retrieved pages to ${cachePath}`);
    mkdirSync(CACHE_DIRECTORY, { recursive: true });
    writeFileSync(cachePath, JSON.stringify(pages));

    return pages;
}
