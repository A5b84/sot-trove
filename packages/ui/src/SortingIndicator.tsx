import type { ReactNode } from 'react';
import style from './SortingIndicator.module.css';

export function SortingIndicator({ direction }: { direction: 'asc' | 'desc' | 'unset' }): ReactNode {
    return (
        <svg viewBox='0 0 8 10' className={style['sorting-indicator']}>
            {direction !== 'desc' && <path d='M 4,0 l 4,4 h -8' />}
            {direction !== 'asc' && <path d='M 4,10 l 4,-4 h -8' />}
        </svg>
    );
}
