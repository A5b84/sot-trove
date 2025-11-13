import type { ReactNode } from 'react';
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
                        <a href='https://seaofthieves.wiki.gg/wiki/Sovereigns'>Sovereigns</a>
                    </th>
                    <th>
                        <a href='https://seaofthieves.wiki.gg/wiki/Reaper%27s_Bones'>Reaper’s Bones</a>
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
