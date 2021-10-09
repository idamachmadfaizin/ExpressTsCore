import { Router } from 'express';

export abstract class CModule {
  middleware: any[] = [];
  abstract base: string;
  abstract routes(router: Router): void;
}
