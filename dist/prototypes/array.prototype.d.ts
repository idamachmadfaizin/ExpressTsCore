declare global {
    interface ArrayConstructor {
        concatNotNull(...arrays: any): any[];
    }
}
export {};
