import type { GameData } from 'common';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { CargoTreasureProvider } from './treasure/CargoTreasureProvider';

const treasureProvider = new CargoTreasureProvider();
const treasures = await treasureProvider.getTreasures();
const gameData: GameData = {
    generatedOn: Date.now(),
    treasures,
};
const dataPath = resolve('../ui/src/gameData.json');
console.log(`Writing data to ${dataPath}`);
writeFileSync(dataPath, JSON.stringify(gameData));
