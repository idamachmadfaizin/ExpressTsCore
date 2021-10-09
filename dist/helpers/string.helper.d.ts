export declare class StringHelper {
    /**
     * Get domain from full url
     * @param url string url start from http or https
     */
    static domain(url: string): string;
    static urlPrefix(url?: string): string;
    static limit(sentence: string, charLimit: number, ending?: string): string;
    static words(sentence: string, wordLimit: number, ending?: string): string;
}
