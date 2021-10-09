import { Application } from 'express';
import { CModule } from './models/module.class';
export default class AppModules {
    static forRoot(modules: (typeof CModule)[], app: Application): void;
}
