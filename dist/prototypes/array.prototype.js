"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Combines all params to array together if not null
 * @param params any
 */
Array.concatNotNull = (...params) => [].concat(...params.filter((x) => Array.isArray(x) && x.length > 0 ? true : !!x));
//# sourceMappingURL=array.prototype.js.map