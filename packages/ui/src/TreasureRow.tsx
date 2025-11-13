import { FACTIONS } from 'common';
import { memo, type ReactNode } from 'react';
import CurrencyAmount from './CurrencyAmount';
import FactionLink from './FactionLink';
import type { EnrichedTreasure } from './gameData';
import style from './TreasureRow.module.css';

const TreasureRow = memo(function ({ treasure }: { treasure: EnrichedTreasure }): ReactNode {
    return (
        <tr>
            <td>
                <a href={treasure.url}>{treasure.name}</a>
            </td>
            <td className={style['number-cell']}>
                <CurrencyAmount minAmount={treasure.minGoldReward} maxAmount={treasure.maxGoldReward} currency='gold' />
                <CurrencyAmount minAmount={treasure.doubloonReward} currency='doubloon' />
            </td>
            <td>
                {treasure.sellTo.map(
                    buyer =>
                        buyer !== FACTIONS.SOVEREIGNS &&
                        buyer !== FACTIONS.REAPERS_BONES && [<FactionLink name={buyer} />, <br />]
                )}
            </td>
            <td className={style['checkmark-cell']}>{treasure.sellTo.includes(FACTIONS.SOVEREIGNS) && '✓'}</td>
            <td className={style['checkmark-cell']}>{treasure.sellTo.includes(FACTIONS.REAPERS_BONES) && '✓'}</td>
        </tr>
    );
});

export default TreasureRow;
