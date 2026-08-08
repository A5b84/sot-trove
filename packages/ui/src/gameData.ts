import type { GameData } from 'common';
import gameDataJson from './gameData.json';

export const GAME_DATA = gameDataJson as unknown as GameData;
