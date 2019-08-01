import {ObjectLiteral} from 'typeorm';

export function getWhereAndValue(where: ObjectLiteral, anchor = '=', values?: ObjectLiteral[]): [string, ObjectLiteral] {
  if (values && values.length) {
    const whereDep: string[] = [];
    const whereValue = {};
    // tslint:disable-next-line:forin
    for (const i in where) {
      let isRunBreak = false;
      for (const k of values) {
        if (i in k) {
          isRunBreak = true;
          whereDep.push(`${i} ${anchor} :${i}`);
          whereValue[i] = k[where[i]];
          break;
        }
      }
      if (isRunBreak === false) {
        whereDep.push(`${i} ${anchor} :${i}`);
        whereValue[i] = '';
      }
    }
    return [whereDep.join(' AND '), whereValue];
  }
  return [Object.keys(where).map(it => `${it} ${anchor} :${it}`).join(' AND '), where];
}
