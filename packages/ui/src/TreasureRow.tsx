import type { Treasure } from 'common';
import { Fragment, memo, type ReactNode } from 'react';
import CurrencyAmount from './CurrencyAmount';
import FactionLink from './FactionLink';
import style from './TreasureRow.module.css';
import { FACTION_SPECIFIC_COLUMNS } from './util';

const TreasureRow = memo(function ({ treasure }: { treasure: Treasure }): ReactNode {
    return (
        <tr>
            <td>
                <a href={treasure.url} target='_blank'>
                    {treasure.name}
                </a>
            </td>
            <td className={style['number-cell']}>
                <div className={style['column']}>
                    <CurrencyAmount
                        minAmount={treasure.minGoldReward}
                        maxAmount={treasure.maxGoldReward}
                        currency='gold'
                    />
                    <CurrencyAmount minAmount={treasure.doubloonReward} currency='doubloon' />
                </div>
                {treasure.hasRewardNote && (
                    <span className={style['note']} title='May vary, see the wiki article'>
                        *
                    </span>
                )}
            </td>
            <td>
                {treasure.sellTo.map(
                    faction =>
                        !FACTION_SPECIFIC_COLUMNS.has(faction) && (
                            <Fragment key={faction}>
                                <FactionLink name={faction} />
                                <br />
                            </Fragment>
                        ),
                )}
            </td>
            {Array.from(FACTION_SPECIFIC_COLUMNS, (faction, index) => (
                <td key={index} className={style['checkmark-cell']}>
                    {treasure.sellTo.includes(faction) && '✓'}
                </td>
            ))}
        </tr>
    );
});

export default TreasureRow;
