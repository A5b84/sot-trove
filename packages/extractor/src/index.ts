import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { extractTreasures, type Treasure } from './treasure';
import { LOCALE } from './util';
import { fetchAllCategoryMembers, type Page } from './wiki';

const REFRESH_CACHE_FLAG = '--refresh-cache';
const REFRESH_CACHE = process.argv.includes(REFRESH_CACHE_FLAG);
const CACHE_DIRECTORY = resolve('cache');

const pages = await getPages();
const treasures: Treasure[] = [];

for (const page of pages) {
    for (const treasure of extractTreasures(page)) {
        treasures.push(treasure);
    }
}

treasures.sort((t1, t2) => t1.name.localeCompare(t2.name, LOCALE));
const treasuresPath = join(CACHE_DIRECTORY, 'treasures.json');
console.log(`Writing treasure data to ${treasuresPath}`);
writeFileSync(treasuresPath, JSON.stringify(treasures));

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
