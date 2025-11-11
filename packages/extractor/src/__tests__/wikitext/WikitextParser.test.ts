import { expect, test } from 'vitest';
import { tokenizeWikitext } from '../../wikitext/tokenizeWikitext';
import { WikitextParser, type WikiNode } from '../../wikitext/WikitextParser';

test('WikitextParser', () => {
    const tokens = tokenizeWikitext(
        'Some text {{Infobox | Title = Hello | Category = {{Some Thing | param = 1}}}} More text'
    );
    const parser = new WikitextParser(tokens);
    const actualNodes = parser.parse();

    const expectedNodes: WikiNode[] = [
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
    ];

    expect(actualNodes).toEqual(expectedNodes);
});
