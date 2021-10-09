"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralError = void 0;
class GeneralError extends Error {
    constructor(message) {
        super(message);
        this.message = message || '';
    }
}
exports.GeneralError = GeneralError;
//# sourceMappingURL=general-error.js.map