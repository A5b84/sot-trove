import type { GameData } from 'common';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { WikitextTreasureProvider } from './treasure/WikitextTreasureProvider';

const treasureProvider = new WikitextTreasureProvider();
const treasures = await treasureProvider.getTreasures();

const gameData: GameData = {
    generatedOn: Date.now(),
    treasures,
};

const dataPath = resolve('../ui/src/gameData.json');
console.log(`Writing data to ${dataPath}`);
writeFileSync(dataPath, JSON.stringify(gameData));
