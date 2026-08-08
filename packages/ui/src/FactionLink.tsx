import { FACTIONS, guessWikiLink } from 'common';
import type { ReactNode } from 'react';
import InlineIcon from './InlineIcon';
import goldHoardersIcon from '/gold-hoarders.svg';
import merchantAllianceIcon from '/merchant-alliance.svg';
import orderOfSoulsIcon from '/order-of-souls.svg';
import reapersBonesIcon from '/reapers-bones.svg';
import smugglersLeagueIcon from '/smugglers-league.svg';
import sovereignsIcon from '/sovereigns.svg';

const ICON_LINK_BY_FACTION: ReadonlyMap<string, string> = new Map([
    [FACTIONS.GOLD_HOARDERS, goldHoardersIcon],
    [FACTIONS.MERCHANT_ALLIANCE, merchantAllianceIcon],
    [FACTIONS.ORDER_OF_SOULS, orderOfSoulsIcon],
    [FACTIONS.REAPERS_BONES, reapersBonesIcon],
    [FACTIONS.SMUGGLERS_LEAGUE, smugglersLeagueIcon],
    [FACTIONS.SOVEREIGNS, sovereignsIcon],
]);

const ICON_CHAR_BY_FACTION: ReadonlyMap<string, string> = new Map([
    [FACTIONS.BILGE_RATS, '🐀'],
    [FACTIONS.HUNTERS_CALL, '🐟'],
]);

export default function FactionLink({ name }: { name: string }): ReactNode {
    return (
        <a href={guessWikiLink(name)} target='_blank'>
            {getIcon(name)}
            {name}
        </a>
    );
}

function getIcon(factionName: string): ReactNode {
    const iconLink = ICON_LINK_BY_FACTION.get(factionName);
    if (iconLink) {
        return <InlineIcon src={iconLink} iconId={factionName} spaceAfter />;
    }

    const textIcon = ICON_CHAR_BY_FACTION.get(factionName);
    if (textIcon) {
        return textIcon + ' ';
    }

    return undefined;
}
