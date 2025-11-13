import { FACTIONS, guessWikiLink } from 'common';
import type { ReactNode } from 'react';
import InlineIcon from './InlineIcon';
import goldHoardersIcon from '/gold-hoarders.svg';
import merchantAllianceIcon from '/merchant-alliance.svg';
import reapersBonesIcon from '/reapers-bones.svg';

const ICON_BY_FACTION: Readonly<Record<string, string>> = {
    [FACTIONS.GOLD_HOARDERS]: goldHoardersIcon,
    [FACTIONS.MERCHANT_ALLIANCE]: merchantAllianceIcon,
    [FACTIONS.REAPERS_BONES]: reapersBonesIcon,
};

export default function FactionLink({ name }: { name: string }): ReactNode {
    const iconLink = ICON_BY_FACTION[name] as string | undefined;
    return (
        <>
            {iconLink && <InlineIcon src={iconLink} iconId={name} spaceAfter />}
            <a href={guessWikiLink(name)}>{name}</a>
        </>
    );
}
