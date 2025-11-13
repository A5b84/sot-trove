import type { ReactNode } from 'react';
import style from './InlineIcon.module.css';

export default function InlineIcon({
    src,
    iconId,
    spaceBefore,
    spaceAfter,
}: {
    src: string;
    iconId?: string;
    spaceBefore?: boolean;
    spaceAfter?: boolean;
}): ReactNode {
    const classes = [style['inline-icon']];

    if (spaceBefore) {
        classes.push(style['space-before']);
    }

    if (spaceAfter) {
        classes.push(style['space-after']);
    }

    return <img className={classes.join(' ')} src={src} data-icon-id={iconId} />;
}
