import type { ReactNode } from 'react';
import packageJson from '../../../package.json';
import style from './App.module.css';
import CurrencyAmount from './CurrencyAmount';
import { GAME_DATA } from './gameData';
import { toIsoDateString } from './util';

export default function App(): ReactNode {
    return (
        <>
            <main>
                <table>
                    <thead>
                        <tr>
                            <th>Treasure</th>
                            <th>Gold value</th>
                            <th>Doubloon value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {GAME_DATA.treasures.map((treasure, index) => (
                            <tr key={index}>
                                <td>
                                    <a href={treasure.url}>{treasure.name}</a>
                                </td>
                                <td className={style['number-cell']}>
                                    <CurrencyAmount
                                        minAmount={treasure.minGoldReward}
                                        maxAmount={treasure.maxGoldReward}
                                        currency='gold'
                                    />
                                </td>
                                <td className={style['number-cell']}>
                                    <CurrencyAmount minAmount={treasure.doubloonReward} currency='doubloon' />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
            <footer>
                <p>Data last updated on {toIsoDateString(new Date(GAME_DATA.generatedOn))}.</p>
                <p>
                    This page uses data from the{' '}
                    <a href='https://seaofthieves.wiki.gg/'>
                        <em>Sea of Thieves</em> Wiki
                    </a>
                    .<br />
                    Wiki content is under{' '}
                    <a href='https://creativecommons.org/licenses/by-nc-sa/4.0'>
                        Creative Commons Attribution-Non-Commercial-ShareAlike 4.0 License
                    </a>{' '}
                    unless otherwise noted.
                </p>
                <p>
                    <a href={packageJson.repository.url}>GitHub</a>
                </p>
            </footer>
        </>
    );
}
