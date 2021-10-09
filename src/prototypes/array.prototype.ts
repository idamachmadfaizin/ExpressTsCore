declare global {
  interface ArrayConstructor {
    concatNotNull(...arrays: any): any[];
  }
}
/**
 * Combines all params to array together if not null
 * @param params any
 */
Array.concatNotNull = (...params: any): any[] =>
  [].concat(...params.filter((x: any) => Array.isArray(x) && x.length > 0 ? true : !!x));

export { };
