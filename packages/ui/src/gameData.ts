import type { GameData, Treasure } from 'common';
import gameDataJson from './gameData.json';
import { normalizeForSearch } from './util';

export type EnrichedTreasure = Treasure & {
    readonly id: number;
    readonly normalizedName: string;
    readonly sellToNormalizedForSearch: readonly string[];
};

export type EnrichedGameData = Omit<GameData, 'treasures'> & {
    readonly treasures: readonly EnrichedTreasure[];
};

const baseGamedata = gameDataJson as unknown as GameData;
export const GAME_DATA: EnrichedGameData = {
    ...baseGamedata,
    treasures: baseGamedata.treasures.map<EnrichedTreasure>((treasure, index) => ({
        ...treasure,
        id: index,
        normalizedName: normalizeForSearch(treasure.name),
        sellToNormalizedForSearch: treasure.sellTo.map(normalizeForSearch),
    })),
};
