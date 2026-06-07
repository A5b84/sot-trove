import type { GameData } from 'common';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { WikitextTreasureProvider } from './treasure/WikitextTreasureProvider';

const treasureProvider = new WikitextTreasureProvider();
const treasures = await treasureProvider.getTreasures();

if (treasures.length === 0) {
    throw new Error('Did not retrieve any treasure, something is probably broken');
}

const gameData: GameData = {
    generatedOn: new Date(),
    treasures,
};

const dataPath = resolve('../ui/src/gameData.json');
console.log(`Writing data to ${dataPath}`);
writeFileSync(dataPath, JSON.stringify(gameData, null, 4));
