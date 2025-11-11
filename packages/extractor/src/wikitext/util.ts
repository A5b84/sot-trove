import { LOCALE } from '../util';
import type { WikiNode, WikiTemplateNode } from './types';

export function normalizeCase(value: string): string {
    return value.toLocaleLowerCase(LOCALE);
}

export function forEachTemplate(
    node: WikiNode,
    normalizedTemplateName: string,
    action: (templateNode: WikiTemplateNode) => void
): void {
    switch (node.type) {
        case 'text':
            break;

        case 'template':
            if (normalizeCase(node.name) === normalizedTemplateName) {
                action(node);
            }

            // Not checking recursively because it's not needed for our use case
            break;

        default: {
            const _exhaustivenessCheck: never = node;
            throw new Error(`Unknown node type for node ${node}`);
        }
    }
}
