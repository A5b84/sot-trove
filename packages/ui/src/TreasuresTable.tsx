import { useState, type ReactNode } from 'react';
import {
    booleanComparator,
    chainComparators,
    numberComparator,
    reverseComparator,
    stringArrayComparator,
    stringComparator,
    type Comparator,
} from './comparators';
import FactionLink from './FactionLink';
import type { EnrichedTreasure } from './gameData';
import { SortingIndicator } from './SortingIndicator';
import TreasureRow from './TreasureRow';
import style from './TreasuresTable.module.css';
import { FACTION_SPECIFIC_COLUMNS } from './util';

type Column = {
    readonly header: ReactNode;
    readonly comparator: Comparator<EnrichedTreasure>;
};

const NAME_COMPARATOR = stringComparator<EnrichedTreasure>(treasure => treasure.name);
const DEFAULT_COMPARATOR = NAME_COMPARATOR;

const COLUMNS: readonly Column[] = [
    {
        header: 'Treasure',
        comparator: NAME_COMPARATOR,
    },
    {
        header: 'Value',
        comparator: chainComparators(
            numberComparator(treasure => treasure.doubloonReward ?? 0),
            chainComparators(
                numberComparator(treasure => treasure.maxGoldReward ?? treasure.minGoldReward ?? 0),
                DEFAULT_COMPARATOR,
            ),
        ),
    },
    {
        header: 'Buyers',
        comparator: chainComparators(
            stringArrayComparator(treasure =>
                treasure.sellTo.filter(faction => !FACTION_SPECIFIC_COLUMNS.has(faction)),
            ),
            DEFAULT_COMPARATOR,
        ),
    },
    ...Array.from(FACTION_SPECIFIC_COLUMNS, faction => ({
        header: <FactionLink name={faction} />,
        comparator: chainComparators(
            booleanComparator(treasure => treasure.sellTo.includes(faction)),
            DEFAULT_COMPARATOR,
        ),
    })),
];

type Sorting =
    | {
          readonly columnIndex: number;
          readonly direction: 'asc' | 'desc';
      }
    | undefined;

export default function TreasuresTable({ treasures }: { treasures: readonly EnrichedTreasure[] }): ReactNode {
    const [sorting, setSorting] = useState<Sorting>();
    let comparator = DEFAULT_COMPARATOR;

    if (sorting) {
        comparator = COLUMNS[sorting.columnIndex].comparator;

        if (sorting.direction === 'desc') {
            comparator = reverseComparator(comparator);
        }
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
                    treasures
                        .toSorted(comparator)
                        .map(treasure => <TreasureRow key={treasure.id} treasure={treasure} />)
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
