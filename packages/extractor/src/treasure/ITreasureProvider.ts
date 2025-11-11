export type Treasure = {
    name: string;
    url: string;
    minGoldReward?: number;
    maxGoldReward?: number;
    doubloonReward?: number;
};

export interface ITreasureProvider {
    getTreasures(): Promise<Treasure[]>;
}
