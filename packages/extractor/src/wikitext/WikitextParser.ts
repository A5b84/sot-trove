import type { WikiNode, WikiTemplateNode, WikiTemplateNodeParameter, WikiTextNode } from './types';

type ParseResult<T> = {
    value: T;
    // Index of the next token after this node
    endIndex: number;
};

export class WikitextParser {
    private readonly tokens: readonly string[];

    constructor(tokens: readonly string[]) {
        this.tokens = tokens;
    }

    parse(): WikiNode[] {
        let currentIndex = 0;
        const nodes: WikiNode[] = [];

        while (currentIndex < this.tokens.length) {
            const { value: node, endIndex } = this.parseNode(currentIndex);
            nodes.push(node);
            currentIndex = endIndex;
        }

        return nodes;
    }

    private parseNode(startIndex: number): ParseResult<WikiNode> {
        return this.tryParseTemplateNode(startIndex) ?? this.parseTextNode(startIndex);
    }

    private tryParseTemplateNode(startIndex: number): ParseResult<WikiTemplateNode> | undefined {
        let currentIndex = startIndex;

        if (this.tokens[currentIndex++] === '{' && this.tokens[currentIndex++] === '{') {
            // No problem if currentIndex exceeds this.tokens.length, we just won't find the end of the template and will return undefined
            const name = this.tokens[currentIndex++];
            const parameters: WikiTemplateNodeParameter[] = [];
            let nextParameter: ParseResult<WikiTemplateNodeParameter> | undefined;

            while ((nextParameter = this.tryParseTemplateNodeParameter(currentIndex)) !== undefined) {
                parameters.push(nextParameter.value);
                currentIndex = nextParameter.endIndex;
            }

            if (this.isTemplateEnd(currentIndex)) {
                return {
                    value: {
                        type: 'template',
                        name: name.trim(),
                        parameters,
                    },
                    endIndex: currentIndex + 2, // Skip both '}'
                };
            }
        }

        return undefined;
    }

    private tryParseTemplateNodeParameter(startIndex: number): ParseResult<WikiTemplateNodeParameter> | undefined {
        let currentIndex = startIndex;

        if (this.isParameterStart(currentIndex)) {
            currentIndex++;
            const name = this.tokens[currentIndex++];
            if (this.tokens[currentIndex++] === '=') {
                const value: WikiNode[] = [];

                while (currentIndex < this.tokens.length) {
                    if (this.isParameterStart(currentIndex) || this.isTemplateEnd(currentIndex)) {
                        this.trimNodeSequence(value);
                        return {
                            value: {
                                name: name.trim(),
                                value,
                            },
                            endIndex: currentIndex,
                        };
                    } else {
                        const { value: node, endIndex } = this.parseNode(currentIndex);
                        value.push(node);
                        currentIndex = endIndex;
                    }
                }
            }
        }

        return undefined;
    }

    private isParameterStart(startIndex: number): boolean {
        return this.tokens[startIndex] === '|';
    }

    private isTemplateEnd(startIndex: number): boolean {
        return this.tokens[startIndex] === '}' && this.tokens[startIndex + 1] === '}';
    }

    private trimNodeSequence(nodes: WikiNode[]): void {
        this.trimNodeSequenceEnd(nodes);
        this.trimNodeSequenceStart(nodes);
    }

    private trimNodeSequenceStart(nodes: WikiNode[]): void {
        let nodesToRemove = 0;

        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];

            if (node.type === 'text') {
                const trimmedContent = node.content.trimStart();

                if (trimmedContent) {
                    node.content = trimmedContent;
                    break;
                } else {
                    nodesToRemove++;
                }
            } else {
                break;
            }
        }

        nodes.splice(0, nodesToRemove);
    }

    private trimNodeSequenceEnd(nodes: WikiNode[]): void {
        while (nodes.length > 0) {
            const last = nodes.at(-1)!;

            if (last.type === 'text') {
                const trimmedContent = last.content.trimEnd();

                if (trimmedContent) {
                    last.content = trimmedContent;
                    break;
                } else {
                    nodes.pop();
                }
            } else {
                break;
            }
        }
    }

    private parseTextNode(startIndex: number): ParseResult<WikiTextNode> {
        return {
            value: {
                type: 'text',
                content: this.tokens[startIndex],
            },
            endIndex: startIndex + 1,
        };
    }
}
