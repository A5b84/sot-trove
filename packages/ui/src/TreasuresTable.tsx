import type { Treasure } from 'common';
import { useState, type ReactNode } from 'react';
import {
    booleanComparator,
    chainComparators,
    numberComparator,
    stringArrayComparator,
    stringComparator,
    type Comparator,
} from './comparators';
import FactionLink from './FactionLink';
import { SortingIndicator } from './SortingIndicator';
import TreasureRow from './TreasureRow';
import style from './TreasuresTable.module.css';
import { FACTION_SPECIFIC_COLUMNS } from './util';

type Column = {
    readonly header: ReactNode;
    readonly comparator: Comparator<Treasure>;
};

const COLUMNS: readonly Column[] = [
    {
        header: 'Treasure',
        comparator: stringComparator(treasure => treasure.name),
    },
    {
        header: 'Value',
        comparator: chainComparators(
            numberComparator(treasure => treasure.doubloonReward ?? 0),
            numberComparator(treasure => treasure.maxGoldReward ?? treasure.minGoldReward ?? 0),
        ),
    },
    {
        header: 'Buyers',
        comparator: stringArrayComparator(treasure =>
            treasure.sellTo.filter(faction => !FACTION_SPECIFIC_COLUMNS.has(faction)),
        ),
    },
    ...Array.from<string, Column>(FACTION_SPECIFIC_COLUMNS, faction => ({
        header: <FactionLink name={faction} />,
        comparator: booleanComparator(treasure => treasure.sellTo.includes(faction)),
    })),
];

type Sorting =
    | {
          readonly columnIndex: number;
          readonly direction: 'asc' | 'desc';
      }
    | undefined;

export default function TreasuresTable({ treasures }: { treasures: readonly Treasure[] }): ReactNode {
    const [sorting, setSorting] = useState<Sorting>();

    if (sorting) {
        const sortedTreasures = treasures.toSorted(COLUMNS[sorting.columnIndex].comparator);

        if (sorting.direction === 'desc') {
            sortedTreasures.reverse();
        }

        treasures = sortedTreasures;
    }

    function cycleSorting(columnIndex: number): void {
        if (sorting && sorting.columnIndex === columnIndex) {
            if (sorting.direction === 'asc') {
                setSorting({
                    columnIndex,
                    direction: 'desc',
                });
            } else {
                setSorting(undefined);
            }
        } else {
            setSorting({
                columnIndex,
                direction: 'asc',
            });
        }
    }

    return (
        <table className={style['treasures-table']}>
            <thead>
                <tr>
                    {COLUMNS.map((column, index) => (
                        <th key={index} onClick={() => cycleSorting(index)}>
                            {column.header}{' '}
                            <SortingIndicator
                                direction={
                                    sorting !== undefined && sorting.columnIndex === index ? sorting.direction : 'unset'
                                }
                            />
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {treasures.length > 0 ? (
                    treasures.map(treasure => <TreasureRow key={treasure.name} treasure={treasure} />)
                ) : (
                    <tr>
                        <td
                            colSpan={COLUMNS.length}
                            className='subtle'
                            style={{
                                textAlign: 'center',
                            }}
                        >
                            No results
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
