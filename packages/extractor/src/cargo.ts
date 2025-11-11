import { checkResponseOk } from './util';

export async function getAllRowsOfCargoTable<R>(table: string, fields: string[]): Promise<R[]> {
    const fieldsString = fields.join(',');
    const rows: R[] = [];
    let currentBatch = 1;
    console.log(`Retrieving all rows of Cargo table ${table}`);

    while (true) {
        console.log(`Batch ${currentBatch} (${rows.length} rows so far)...`);

        const newRows = await getCargoTableRowBatch<R>(table, fieldsString, rows.length);
        if (newRows.length > 0) {
            for (const row of newRows) {
                rows.push(row);
            }

            currentBatch++;
        } else {
            break;
        }
    }

    console.log(`Retrieved ${rows.length} rows from Cargo table ${table}`);
    return rows;
}

async function getCargoTableRowBatch<R>(table: string, fields: string, offset: number): Promise<R[]> {
    // https://seaofthieves.wiki.gg/api.php?action=help&modules=cargoquery
    const params = new URLSearchParams({
        action: 'cargoquery',
        format: 'json',
        limit: 'max',
        tables: table,
        fields,
        offset: offset.toString(),
    });

    const url = 'https://seaofthieves.wiki.gg/api.php?' + params;
    const response = await fetch(url);
    checkResponseOk(response);
    const result = (await response.json()) as CargoResult<R>;
    return result.cargoquery.map(record => record.title);
}

type CargoResult<R> = {
    cargoquery: {
        title: R;
    }[];
};
