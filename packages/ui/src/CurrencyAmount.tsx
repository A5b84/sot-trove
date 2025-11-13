import type { ReactNode } from 'react';
import InlineIcon from './InlineIcon';
import { LOCALE } from './util';
import doubloonIcon from '/doubloon.svg';
import goldIcon from '/gold.svg';

type Currency = 'gold' | 'doubloon';

const ICON_BY_CURRENCY: Readonly<Record<Currency, string>> = {
    gold: goldIcon,
    doubloon: doubloonIcon,
};

export default function CurrencyAmount({
    minAmount,
    maxAmount,
    currency,
}: {
    minAmount?: number;
    maxAmount?: number;
    currency: Currency;
}): ReactNode {
    if (!isAmountToShow(minAmount)) {
        return undefined;
    }

    return (
        <>
            {formatNumber(minAmount)}
            {isAmountToShow(maxAmount) && <>–{formatNumber(maxAmount)}</>}
            <InlineIcon src={ICON_BY_CURRENCY[currency]} iconId={currency} spaceBefore />
        </>
    );
}

function isAmountToShow(value?: number): value is number {
    return value !== undefined && value !== 0;
}

function formatNumber(value: number): string {
    return value.toLocaleString(LOCALE);
}
