// https://github.com/microsoft/TypeScript/issues/61321
declare global {
    interface RegExpConstructor {
        escape(str: string): string;
    }
}

const TOKENIZATION_SPLIT_PATTERN = ((): RegExp => {
    const specialTokens = ['{', '|', '=', '}'];
    const specialTokenPattern = specialTokens.map(RegExp.escape).join('|');
    return new RegExp(`(?<=${specialTokenPattern})|(?=${specialTokenPattern})`);
})();

export function tokenizeWikitext(wikitext: string): string[] {
    return wikitext.split(TOKENIZATION_SPLIT_PATTERN);
}
