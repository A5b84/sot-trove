import type { ReactNode } from 'react';
import packageJson from '../../../package.json';
import { GAME_DATA } from './gameData';
import TreasureSearch from './TreasureSearch';
import { FOCUS_SEARCH_BAR_SHORTCUTS, toIsoDateString } from './util';

export default function App(): ReactNode {
    return (
        <>
            <main>
                <TreasureSearch />
            </main>
            <footer>
                <p>Tip: press {FOCUS_SEARCH_BAR_SHORTCUTS.join(' or ')} to select the search bar.</p>
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
