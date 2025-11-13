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
    sellTo: readonly string[];
}>;

export const FACTIONS = {
    // Values should be titles of the corresponding wiki pages
    BILGE_RATS: 'Bilge Rats',
    GOLD_HOARDERS: 'Gold Hoarders',
    HUNTERS_CALL: "The Hunter's Call",
    MERCHANT_ALLIANCE: 'Merchant Alliance',
    ORDER_OF_SOULS: 'Order of Souls',
    REAPERS_BONES: "Reaper's Bones",
    SMUGGLERS_LEAGUE: "Smugglers' League",
    SOVEREIGNS: 'Sovereigns',
} as const;

export function guessWikiLink(title: string): string {
    return `https://seaofthieves.wiki.gg/wiki/${title.replaceAll(' ', '_')}`;
}
