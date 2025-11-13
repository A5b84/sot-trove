export const LOCALE = 'en';

export function compareIgnoreCase(s1: string, s2: string): number {
    return s1.localeCompare(s2, LOCALE, {
        sensitivity: 'accent',
    });
}

export function toIsoDateString(date: Date): string {
    return date.getFullYear() + '-' + zeroPad(date.getMonth() + 1, 2) + '-' + zeroPad(date.getDate(), 2);
}

function zeroPad(value: number, maxLength: number): string {
    return value.toString().padStart(maxLength, '0');
}

export function normalizeForSearch(value: string): string {
    return value.toLocaleLowerCase().replaceAll("'", '').replaceAll('-', ' ');
}

export const FOCUS_SEARCH_BAR_SHORTCUTS = ['Q', '/'] as const;
