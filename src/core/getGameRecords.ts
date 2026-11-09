import type { GameRecord } from './GameRecord.js';

export const getGameRecords = (): GameRecord[] => {
  const savedRecords = localStorage.getItem('bulls-and-cows-records');

  if (!savedRecords) {
    return [];
  }

  return JSON.parse(savedRecords) as GameRecord[];
};
