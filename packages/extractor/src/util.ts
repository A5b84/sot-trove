export const LOCALE = 'en';

export async function checkResponseOk(response: Response): Promise<void> {
    if (!response.ok) {
        const body = await response.text();
        throw new Error(
            `Failed to fetch ${response.url}: ${response.status} ${response.statusText}\n` + 'Response body:\n' + body
        );
    }
}
