import { expect, test } from 'vitest';
import { tokenizeWikitext } from '../../wikitext/tokenizeWikitext';

test('tokenizeWikitext', () => {
    const actualTokens = tokenizeWikitext(
        'Some text {{Infobox | Title = Hello | Category = {{Some Thing | param = 1}}}} More text'
    );
    expect(actualTokens).toEqual([
        'Some text ',
        '{',
        '{',
        'Infobox ',
        '|',
        ' Title ',
        '=',
        ' Hello ',
        '|',
        ' Category ',
        '=',
        ' ',
        '{',
        '{',
        'Some Thing ',
        '|',
        ' param ',
        '=',
        ' 1',
        '}',
        '}',
        '}',
        '}',
        ' More text',
    ]);
});
