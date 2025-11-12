export function toIsoDateString(date: Date): string {
    return date.getFullYear() + '-' + zeroPad(date.getMonth() + 1, 2) + '-' + zeroPad(date.getDate(), 2);
}

function zeroPad(value: number, maxLength: number): string {
    return value.toString().padStart(maxLength, '0');
}
