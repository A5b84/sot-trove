import { getOrComputeCachedValue } from '../cache';
import { LOCALE } from '../util';

import type { Page } from '../wiki';
import { tokenizeWikitext } from '../wikitext/tokenizeWikitext';
import type { WikiNode, WikiTemplateNode, WikiTemplateNodeParameter } from '../wikitext/types';
import { forEachTemplate, normalizeCase } from '../wikitext/util';
import { WikitextParser } from '../wikitext/WikitextParser';

import type { Treasure } from 'common';
import { fetchAllCategoryMembers } from '../wiki';
import type { ITreasureProvider } from './ITreasureProvider';

/**
 * Treasure provider that gets its information from `{{treasure}}` templates in pages' sources.
 */
export class WikitextTreasureProvider implements ITreasureProvider {
    async getTreasures(): Promise<Treasure[]> {
        const pages = await getOrComputeCachedValue('pages.json', () => fetchAllCategoryMembers('Treasure'));
        const treasures: Treasure[] = [];

        for (const page of pages) {
            for (const treasure of extractTreasures(page)) {
                treasures.push(treasure);
            }
        }

        treasures.sort((t1, t2) => t1.name.localeCompare(t2.name, LOCALE));
        return treasures;
    }
}

const NORMALIZED_TREASURE_TEMPLATE_NAME = normalizeCase('Treasure');

function extractTreasures(page: Page): Treasure[] {
    const tokens = tokenizeWikitext(page.content);
    const nodes = new WikitextParser(tokens).parse();
    const treasures: Treasure[] = [];

    for (const node of nodes) {
        forEachTemplate(node, NORMALIZED_TREASURE_TEMPLATE_NAME, templateNode =>
            treasures.push(extractTreasureFromTemplate(templateNode, page))
        );
    }

    return treasures;
}

function extractTreasureFromTemplate(node: WikiTemplateNode, page: Page): Treasure {
    let name = page.title;
    let minGoldReward: number | undefined;
    let maxGoldReward: number | undefined;
    let doubloonReward: number | undefined;

    for (const parameter of node.parameters) {
        if (parameter.value.length === 0) {
            continue;
        }

        switch (normalizeCase(parameter.name)) {
            case 'name':
                name = stringifyNodes(parameter.value);
                break;

            case 'reward-min': {
                const value = stringifyNodes(parameter.value);
                if (value.includes('-')) {
                    const [min, max] = value.split('-', 2);
                    minGoldReward = parseInt(min);
                    maxGoldReward = parseInt(max);
                } else {
                    minGoldReward = parseInt(value);
                }
                break;
            }

            case 'reward-max':
                maxGoldReward = parseIntParameter(parameter);
                break;

            case 'reward-d':
                doubloonReward = parseIntParameter(parameter);
                break;
        }
    }

    if (maxGoldReward === minGoldReward) {
        maxGoldReward = undefined;
    }

    return {
        name,
        url: page.url,
        minGoldReward,
        maxGoldReward,
        doubloonReward,
    };
}

function parseIntParameter(node: WikiTemplateNodeParameter): number {
    return parseInt(stringifyNodes(node.value));
}

function stringifyNodes(nodes: WikiNode[]): string {
    return nodes.map(stringifyNode).join('');
}

function stringifyNode(node: WikiNode): string {
    switch (node.type) {
        case 'text':
            return node.content.replace(/<!--.*?-->/g, '');
        case 'template':
            return node.name;
        default: {
            const _exhaustivenessCheck: never = node;
            throw new Error(`Unknown node type for node ${node}`);
        }
    }
}
