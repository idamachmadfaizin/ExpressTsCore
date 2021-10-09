"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * String Formatter
 * Example
 * 'Hello {0} {1}'
 * @param str string
 * @param args string[]
 */
String.format = (str, ...args) => str.replace(/{(\d+)}/g, (match, index) => args[index] || '');
//# sourceMappingURL=string.prototype.js.map