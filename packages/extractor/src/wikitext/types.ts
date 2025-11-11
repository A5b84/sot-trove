export type WikiNode = WikiTextNode | WikiTemplateNode;

export type WikiTextNode = {
    type: 'text';
    content: string;
};
export type WikiTemplateNode = {
    type: 'template';
    name: string;
    parameters: WikiTemplateNodeParameter[];
};

export type WikiTemplateNodeParameter = {
    name: string;
    value: WikiNode[];
};
