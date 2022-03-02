export interface ResultObject {
  [key: string]: string | ResultObject;
}

/**
 * Transforms an object into a formated string
 * @param obj 
 * @returns string with the representation of the object
 */
export function objToString(obj: ResultObject | null): string {
  if (typeof obj !== 'object') {
    return obj;
  }
  if (obj === null) {
    return '';
  }
  const keys: Array<string> = Object.keys(obj);
  let res = '{';
  keys.forEach((key: string) => {
    const prop: ResultObject | string = obj[key];
    if (typeof prop === 'string') {
      res += `\n    ${key}: ${JSON.stringify(prop)}`;
    } else {
      res += `\n${objToString(prop)}`;
    }
  });
  res += '\n}\n';
  return res;
}
