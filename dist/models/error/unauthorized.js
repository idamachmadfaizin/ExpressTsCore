"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unauthorized = void 0;
const general_error_1 = require("./general-error");
class Unauthorized extends general_error_1.GeneralError {
    constructor(message) {
        super();
        this.message = message ?? 'Unauthorized';
    }
}
exports.Unauthorized = Unauthorized;
//# sourceMappingURL=unauthorized.js.map