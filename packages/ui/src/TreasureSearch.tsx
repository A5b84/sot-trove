import Fuse from 'fuse.js';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { GAME_DATA } from './gameData';
import TreasuresTable from './TreasuresTable';
import { compareIgnoreCase, FOCUS_SEARCH_BAR_SHORTCUTS } from './util';

export default function TreasureSearch(): ReactNode {
    const searchBarRef = useRef<HTMLInputElement>(null);

    const fuse = useMemo(
        () =>
            new Fuse(GAME_DATA.treasures, {
                keys: ['name', 'sellTo'],
                threshold: 0.3,
            }),
        [],
    );

    const [filteredTreasures, setFilteredTreasures] = useState(GAME_DATA.treasures);
    const filterTreasures = useDebouncedCallback(
        query => setFilteredTreasures(fuse.search(query).map(result => result.item)),
        200,
    );

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
            <div
                style={{
                    maxWidth: '32em',
                    margin: 'auto',
                }}
            >
                <input
                    onChange={e => filterTreasures(e.target.value)}
                    ref={searchBarRef}
                    placeholder='Search'
                    style={{
                        boxSizing: 'border-box',
                        width: '100%',
                    }}
                />
                <p style={{ color: 'var(--text-subtle)' }}>
                    {filteredTreasures.length} treasure{filteredTreasures.length !== 1 ? 's' : ''}
                </p>
            </div>
            <TreasuresTable treasures={filteredTreasures} />
        </>
    );
}
