import { Application, Router } from 'express';
import { StringHelper } from './helpers/string.helper';

import { CModule } from './models/module.class';

export default class AppModules {

  static forRoot(modules: (typeof CModule)[], app: Application): void {
    if (modules) {
      modules.forEach((module: any) => {
        const { base, middleware, routes }: CModule = new module();

        const router = Router();
        if (middleware?.length > 0) router.use(middleware);
        routes(router);

        app.use(StringHelper.urlPrefix(base), router);
      });
    }
  }
}
