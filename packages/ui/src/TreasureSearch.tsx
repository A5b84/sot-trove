import { useEffect, useRef, useState, type ReactNode } from 'react';
import { GAME_DATA, type EnrichedTreasure } from './gameData';
import TreasuresTable from './TreasuresTable';
import { compareIgnoreCase, FOCUS_SEARCH_BAR_SHORTCUTS, normalizeForSearch } from './util';

export default function TreasureSearch(): ReactNode {
    const [query, setQuery] = useState('');
    const queryTerms = normalizeForSearch(query).trim().split(/\s+/);
    const filteredTreasures =
        queryTerms.length > 0
            ? GAME_DATA.treasures.filter(treasure => matchesTerms(queryTerms, treasure))
            : GAME_DATA.treasures;

    const searchBarRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent): void => {
            if (document.activeElement) {
                const activeTag = document.activeElement.tagName;
                if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') {
                    return;
                }
            }

            if (
                !event.metaKey &&
                !event.ctrlKey &&
                !event.altKey &&
                FOCUS_SEARCH_BAR_SHORTCUTS.some(key => compareIgnoreCase(key, event.key) === 0)
            ) {
                const element = searchBarRef.current;
                if (element) {
                    element.focus();
                    element.select();
                }
                event.preventDefault();
            }
        };

        addEventListener('keydown', handleKeyDown);
        return (): void => removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                ref={searchBarRef}
                placeholder='Search'
                style={{
                    display: 'block',
                    boxSizing: 'border-box',
                    width: '100%',
                    maxWidth: '32em',
                    margin: 'auto',
                }}
            />
            <TreasuresTable treasures={filteredTreasures} />
        </>
    );
}

function matchesTerms(queryTerms: readonly string[], treasure: EnrichedTreasure): boolean {
    return queryTerms.every(
        term =>
            treasure.normalizedName.includes(term) ||
            treasure.sellToNormalizedForSearch.some(faction => faction.includes(term))
    );
}
