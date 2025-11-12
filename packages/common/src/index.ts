export type GameData = Readonly<{
    generatedOn: number;
    treasures: readonly Treasure[];
}>;

export type Treasure = Readonly<{
    name: string;
    url: string;
    minGoldReward?: number;
    maxGoldReward?: number;
    doubloonReward?: number;
}>;
