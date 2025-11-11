import { checkResponseOk } from './util';

const PAGE_SIZE = 50; // See rvlimit on https://www.mediawiki.org/w/api.php?action=help&modules=query%2Brevisions

export type Page = {
    title: string;
    url: string;
    content: string;
};

export async function fetchAllCategoryMembers(category: string): Promise<Page[]> {
    const pages: Page[] = [];
    let currentBatch = 1;
    let continueFrom: string | undefined;
    console.log(`Retrieving pages from category ${category}`);

    do {
        console.log(`Batch ${currentBatch} (${pages.length} pages so far)...`);

        const results = await fetchPartialCategoryMembers(category, continueFrom);
        continueFrom = results.continue?.gcmcontinue;

        for (const page of Object.values(results.query.pages)) {
            pages.push({
                title: page.title,
                url: page.canonicalurl,
                content: page.revisions[0].slots['main']['*'],
            });
        }

        currentBatch++;
    } while (continueFrom);

    console.log(`Retrieved ${pages.length} pages from category ${category}`);
    return pages;
}

type ApiResult = {
    continue?: {
        gcmcontinue: string;
    };
    query: {
        pages: Record<
            string,
            {
                title: string;
                canonicalurl: string;
                revisions: {
                    slots: {
                        main: {
                            '*': string;
                        };
                    };
                }[];
            }
        >;
    };
};

async function fetchPartialCategoryMembers(category: string, continueFrom?: string): Promise<ApiResult> {
    // https://www.mediawiki.org/wiki/API:Action_API
    // https://www.mediawiki.org/w/api.php?action=help&modules=query
    // https://www.mediawiki.org/w/api.php?action=help&modules=query%2Binfo
    // https://www.mediawiki.org/w/api.php?action=help&modules=query%2Brevisions
    // https://www.mediawiki.org/w/api.php?action=help&modules=query%2Bcategorymembers
    const params = new URLSearchParams({
        action: 'query',
        format: 'json',
        prop: 'info|revisions',
        inprop: 'url',
        rvprop: 'content',
        rvslots: 'main',
        generator: 'categorymembers',
        gcmtitle: `Category:${category}`,
        gcmnamespace: '0',
        gcmlimit: PAGE_SIZE.toString(),
    });

    if (continueFrom) {
        params.set('gcmcontinue', continueFrom);
    }

    const url = 'https://seaofthieves.wiki.gg/api.php?' + params;
    const response = await fetch(url);
    checkResponseOk(response);
    return (await response.json()) as ApiResult;
}
