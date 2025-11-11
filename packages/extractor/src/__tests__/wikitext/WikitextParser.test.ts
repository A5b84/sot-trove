import { expect, test } from 'vitest';
import { tokenizeWikitext } from '../../wikitext/tokenizeWikitext';
import type { WikiNode } from '../../wikitext/types';
import { WikitextParser } from '../../wikitext/WikitextParser';

test.each<[string, WikiNode[]]>([
    [
        'Hello world',
        [
            {
                type: 'text',
                content: 'Hello world',
            },
        ],
    ],
    ['{{stub}}', [{ type: 'template', name: 'stub', parameters: [] }]],
    [
        'Some text {{Infobox | Title = Hello | Category = {{Some Thing | param = 1}}}} More text',
        [
            {
                type: 'text',
                content: 'Some text ',
            },
            {
                type: 'template',
                name: 'Infobox',
                parameters: [
                    {
                        name: 'Title',
                        value: [
                            {
                                type: 'text',
                                content: 'Hello',
                            },
                        ],
                    },
                    {
                        name: 'Category',
                        value: [
                            {
                                type: 'template',
                                name: 'Some Thing',
                                parameters: [
                                    {
                                        name: 'param',
                                        value: [
                                            {
                                                type: 'text',
                                                content: '1',
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                type: 'text',
                content: ' More text',
            },
        ],
    ],
])('WikitextParser(%s)', (wikitext, expectedNodes) => {
    const tokens = tokenizeWikitext(wikitext);
    const parser = new WikitextParser(tokens);
    const actualNodes = parser.parse();
    expect(actualNodes).toEqual(expectedNodes);
});
