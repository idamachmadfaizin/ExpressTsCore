"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = void 0;
const general_error_1 = require("./general-error");
class NotFound extends general_error_1.GeneralError {
    constructor(message) {
        super();
        this.message = message ?? 'Notfound';
    }
}
exports.NotFound = NotFound;
//# sourceMappingURL=notfound.js.map