import { FACTIONS } from 'common';
import type { ReactNode } from 'react';
import FactionLink from './FactionLink';
import type { EnrichedTreasure } from './gameData';
import TreasureRow from './TreasureRow';

export default function TreasuresTable({ treasures }: { treasures: readonly EnrichedTreasure[] }): ReactNode {
    const columns = [
        <th>Treasure</th>,
        <th>Value</th>,
        <th>Buyers</th>,
        <th>
            <FactionLink name={FACTIONS.SOVEREIGNS} />
        </th>,
        <th>
            <FactionLink name={FACTIONS.REAPERS_BONES} />
        </th>,
    ];

    return (
        <table
            style={{
                margin: '2em auto',
            }}
        >
            <thead>
                <tr>{columns}</tr>
            </thead>
            <tbody>
                {treasures.length > 0 ? (
                    treasures.map(treasure => <TreasureRow key={treasure.id} treasure={treasure} />)
                ) : (
                    <tr>
                        <td
                            colSpan={columns.length}
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
