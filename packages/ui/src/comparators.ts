import { LOCALE } from './util';

export type Comparator<T> = (a: T, b: T) => number;

export function reverseComparator<T>(comparator: Comparator<T>): Comparator<T> {
    return (a, b) => comparator(b, a);
}

export function numberComparator<T>(extractor: (t: T) => number): Comparator<T> {
    return (a, b) => extractor(a) - extractor(b);
}

export function stringComparator<T>(extractor: (t: T) => string): Comparator<T> {
    return (a, b) => extractor(a).localeCompare(extractor(b), LOCALE);
}

/**
 * Returns a comparator comparing string arrays by length then lexicographically.
 */
export function stringArrayComparator<T>(extractor: (t: T) => readonly string[]): Comparator<T> {
    return (a, b) => {
        const valuesA = extractor(a);
        const valuesB = extractor(b);

        if (valuesA.length !== valuesB.length) {
            return valuesA.length - valuesB.length;
        }

        for (let i = 0; i < valuesA.length; i++) {
            const comparison = valuesA[i].localeCompare(valuesB[i], LOCALE);

            if (comparison !== 0) {
                return comparison;
            }
        }

        return 0;
    };
}

export function booleanComparator<T>(extractor: (t: T) => boolean): Comparator<T> {
    return (a, b) => +extractor(a) - +extractor(b);
}

export function chainComparators<T>(first: Comparator<T>, second: Comparator<T>): Comparator<T> {
    return (a, b) => first(a, b) || second(a, b);
}
