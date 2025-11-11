import { writeFileSync } from 'fs';
import { join } from 'path';
import { CACHE_DIRECTORY } from './cache';
import { WikitextTreasureProvider } from './treasure/WikitextTreasureProvider';

const treasureProvider = new WikitextTreasureProvider();
const treasures = await treasureProvider.getTreasures();
const treasuresPath = join(CACHE_DIRECTORY, 'treasures.json');
console.log(`Writing treasure data to ${treasuresPath}`);
writeFileSync(treasuresPath, JSON.stringify(treasures));
