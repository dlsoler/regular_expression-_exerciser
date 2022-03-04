import Dexie from 'dexie';

export const DATABASE_NAME = 'regExpStorage';
export const DATABASE_VERSION = 1;
export const TABLE_NAME = 'regexps'

export interface IRegExp {
  id?: number;
  pattern: string;
  flags: string;
}

export const db = new Dexie(DATABASE_NAME);
db.version(DATABASE_VERSION).stores({
  [TABLE_NAME]: 'id++, pattern, flags'
});

console.log('Db was created', db);

export async function addRegExp(pattern: string, regExplags: Array<string> | string ){
  const flags = typeof regExplags === 'string' ? regExplags : regExplags.join('');
  return await db.table(TABLE_NAME).add({pattern, flags});
}

export async function deleteRegExp(id: number) {
  return await db.table(TABLE_NAME).delete(id);
}