import type { ReactNode } from 'react';
import style from './CurrencyAmount.module.css';
import doubloonIcon from '/doubloon.svg';
import goldIcon from '/gold.svg';

const LOCALE = 'en';

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
            <img className={style['currency-icon']} src={ICON_BY_CURRENCY[currency]} data-currency={currency} />
        </>
    );
}

function isAmountToShow(value?: number): value is number {
    return value !== undefined && value !== 0;
}

function formatNumber(value: number): string {
    return value.toLocaleString(LOCALE);
}
