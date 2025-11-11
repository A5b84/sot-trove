import type { Treasure } from 'common';

export interface ITreasureProvider {
    getTreasures(): Promise<Treasure[]>;
}
