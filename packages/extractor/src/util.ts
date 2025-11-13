import { FACTIONS } from 'common';

export const LOCALE = 'en';

export async function checkResponseOk(response: Response): Promise<void> {
    if (!response.ok) {
        const body = await response.text();
        throw new Error(
            `Failed to fetch ${response.url}: ${response.status} ${response.statusText}\n` + 'Response body:\n' + body
        );
    }
}

export function normalizeFactionName(name: string): string {
    name = name.trim();
    switch (name) {
        case 'Larinna':
            return FACTIONS.BILGE_RATS;
        case 'Gold Hoarders':
        case 'Hoarders':
            return FACTIONS.GOLD_HOARDERS;
        case "Hunter's Call":
        case "The Hunter's Call":
            return FACTIONS.HUNTERS_CALL;
        case 'Merchant Alliance':
        case 'Senior Traders':
            return FACTIONS.MERCHANT_ALLIANCE;
        case 'Madames':
        case 'Order of Souls':
            return FACTIONS.ORDER_OF_SOULS;
        case 'Caged Skeleton':
        case "Reaper's Bones":
        case 'Servant of the Flame':
        case 'The Servant of the Flame':
            return FACTIONS.REAPERS_BONES;
        case "Smugglers' League":
            return FACTIONS.SMUGGLERS_LEAGUE;
        case 'Sovereigns':
            return FACTIONS.SOVEREIGNS;
        default:
            return name;
    }
}
