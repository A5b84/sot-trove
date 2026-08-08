export type GameData = {
    readonly generatedOn: Date | string; // String when deserialized from JSON
    readonly treasures: readonly Treasure[];
};

export type Treasure = {
    readonly name: string;
    readonly url: string;
    readonly minGoldReward?: number;
    readonly maxGoldReward?: number;
    readonly doubloonReward?: number;
    readonly hasRewardNote?: true;
    readonly sellTo: readonly string[];
};

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
