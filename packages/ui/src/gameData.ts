import type { GameData, Treasure } from 'common';
import gameData from './gameData.json';
import { normalizeForSearch } from './util';

export type EnrichedTreasure = Treasure &
    Readonly<{
        id: number;
        normalizedName: string;
    }>;

export type EnrichedGameData = Omit<GameData, 'treasures'> & {
    readonly treasures: readonly EnrichedTreasure[];
};

export const GAME_DATA: EnrichedGameData = {
    ...gameData,
    treasures: gameData.treasures.map<EnrichedTreasure>((treasure, index) => ({
        ...treasure,
        id: index,
        normalizedName: normalizeForSearch(treasure.name),
    })),
};
