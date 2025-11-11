import { writeFileSync } from 'fs';
import { join } from 'path';
import { CACHE_DIRECTORY } from './cache';
import { CargoTreasureProvider } from './treasure/CargoTreasureProvider';

const treasureProvider = new CargoTreasureProvider();
const treasures = await treasureProvider.getTreasures();
const treasuresPath = join(CACHE_DIRECTORY, 'treasures.json');
console.log(`Writing data of ${treasures.length} treasures to ${treasuresPath}`);
writeFileSync(treasuresPath, JSON.stringify(treasures));
