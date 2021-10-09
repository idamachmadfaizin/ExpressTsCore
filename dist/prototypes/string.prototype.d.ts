declare global {
    interface StringConstructor {
        format(str: string, ...args: any[]): string;
    }
}
export {};
