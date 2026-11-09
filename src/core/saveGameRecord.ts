import type { GameRecord } from './GameRecord.js';

export const saveGameRecord = (record: GameRecord): void => {
  const savedRecords = localStorage.getItem('bulls-and-cows-records');

  const records: GameRecord[] = savedRecords ? JSON.parse(savedRecords) : [];
  records.push(record);
  localStorage.setItem('bulls-and-cows-records', JSON.stringify(records));
};
