import { memo, type ReactNode } from 'react';
import CurrencyAmount from './CurrencyAmount';
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
            </td>
            <td className={style['number-cell']}>
                <CurrencyAmount minAmount={treasure.doubloonReward} currency='doubloon' />
            </td>
        </tr>
    );
});

export default TreasureRow;
