"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roles = exports.authUnless = void 0;
const index_1 = require("@helpers/index");
const error_1 = require("@models/error");
const express_jwt_1 = __importDefault(require("express-jwt"));
function authUnless(pathsExclude, base) {
    if (process.env.TOKEN_SECRET)
        throw new Error('TOKEN_SECRET in .env required');
    const secret = process.env.TOKEN_SECRET ?? '';
    const path = pathsExclude?.map(p => typeof p === 'string' ? index_1.StringHelper.urlPrefix(base ? `${base}${p}` : p) : p);
    return (0, express_jwt_1.default)({ secret, algorithms: ['HS256'] }).unless({
        path,
    });
}
exports.authUnless = authUnless;
function roles(hasRoles = []) {
    const newRoles = typeof hasRoles === 'string' ? [hasRoles] : hasRoles;
    return [
        async (req, res, next) => {
            const payload = req.user;
            if (!payload)
                return next(new error_1.Unauthorized('Unauthorized'));
            if (newRoles.filter(x => payload?.roles.includes(x))?.length === 0)
                return next(new error_1.Forbidden('Do not have permission'));
            next();
        },
    ];
}
exports.roles = roles;
//# sourceMappingURL=auth.middleware.js.map