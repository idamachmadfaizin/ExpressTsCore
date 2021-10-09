export class StringHelper {
  /**
   * Get domain from full url
   * @param url string url start from http or https
   */
  public static domain(url: string): string {
    return url.replace('http://', '').replace('https://', '').split(/[/?#]/)[0];
  }

  public static urlPrefix(url?: string) {
    return `/api/${process.env.APP_VERSION}${url ?? null}`;
  }

  public static limit(sentence: string, charLimit: number, ending: string = ' ...') {
    return sentence.substr(0, charLimit).replace(/\s$/, '') + ending;
  }
  public static words(sentence: string, wordLimit: number, ending: string = ' ...') {
    return sentence.split(' ', wordLimit).join(' ') + ending;
  }
}
