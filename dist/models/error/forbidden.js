"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Forbidden = void 0;
const general_error_1 = require("./general-error");
class Forbidden extends general_error_1.GeneralError {
    constructor(message) {
        super();
        this.message = message ?? 'Forbidden';
    }
}
exports.Forbidden = Forbidden;
//# sourceMappingURL=forbidden.js.map