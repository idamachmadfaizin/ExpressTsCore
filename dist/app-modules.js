"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const string_helper_1 = require("./helpers/string.helper");
class AppModules {
    static forRoot(modules, app) {
        if (modules) {
            modules.forEach((module) => {
                const { base, middleware, routes } = new module();
                const router = (0, express_1.Router)();
                if (middleware?.length > 0)
                    router.use(middleware);
                routes(router);
                app.use(string_helper_1.StringHelper.urlPrefix(base), router);
            });
        }
    }
}
exports.default = AppModules;
//# sourceMappingURL=app-modules.js.map