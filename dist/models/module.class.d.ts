import { Router } from 'express';
export declare abstract class CModule {
    middleware: any[];
    abstract base: string;
    abstract routes(router: Router): void;
}
