declare global {
  interface StringConstructor {
    format(str: string, ...args: any[]): string;
  }
}

/**
 * String Formatter
 * Example
 * 'Hello {0} {1}'
 * @param str string
 * @param args string[]
 */
String.format = (str: string, ...args: any[]): string =>
  str.replace(/{(\d+)}/g, (match, index) => args[index] || '');

export { };
