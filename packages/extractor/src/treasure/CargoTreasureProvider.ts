import { getOrComputeCachedValue } from '../cache';
import { getAllRowsOfCargoTable } from '../cargo';
import type { ITreasureProvider, Treasure } from './ITreasureProvider';

/**
 * Treasure provider that gets its information using [Cargo](https://support.wiki.gg/wiki/Cargo).
 */
export class CargoTreasureProvider implements ITreasureProvider {
    async getTreasures(): Promise<Treasure[]> {
        const cargoTreasures = await getOrComputeCachedValue('cargo-treasures.json', () =>
            getAllRowsOfCargoTable<CargoTreasure>('Treasure', ['fullname', 'rewardMin', 'rewardMax', 'rewardD'])
        );
        return cargoTreasures.map(convertCargoTreasure);
    }
}

type CargoTreasure = {
    fullname: string;
    rewardMin: string;
    rewardMax: string;
    rewardD: string;
};

function convertCargoTreasure(treasure: CargoTreasure): Treasure {
    return {
        name: treasure.fullname,
        url: `https://seaofthieves.wiki.gg/wiki/${treasure.fullname.replaceAll(' ', '_')}`,
        minGoldReward: parseOptionalInt(treasure.rewardMin),
        maxGoldReward: parseOptionalInt(treasure.rewardMax),
        doubloonReward: parseOptionalInt(treasure.rewardD),
    };
}

function parseOptionalInt(value: string): number | undefined {
    return value ? parseInt(value) : undefined;
}
