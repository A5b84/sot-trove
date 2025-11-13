import { FACTIONS } from 'common';
import type { ReactNode } from 'react';
import FactionLink from './FactionLink';
import type { EnrichedTreasure } from './gameData';
import TreasureRow from './TreasureRow';

export default function TreasuresTable({ treasures }: { treasures: readonly EnrichedTreasure[] }): ReactNode {
    return (
        <table
            style={{
                margin: '2em auto',
            }}
        >
            <thead>
                <tr>
                    <th>Treasure</th>
                    <th>Value</th>
                    <th>Buyers</th>
                    <th>
                        <FactionLink name={FACTIONS.SOVEREIGNS} />
                    </th>
                    <th>
                        <FactionLink name={FACTIONS.REAPERS_BONES} />
                    </th>
                </tr>
            </thead>
            <tbody>
                {treasures.length > 0 ? (
                    treasures.map(treasure => <TreasureRow key={treasure.id} treasure={treasure} />)
                ) : (
                    <tr>
                        <td
                            colSpan={3}
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
