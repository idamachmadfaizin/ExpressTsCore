"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = void 0;
const general_error_1 = require("./general-error");
class BadRequest extends general_error_1.GeneralError {
    constructor(message) {
        super();
        this.message = message ?? 'Bad Request';
    }
}
exports.BadRequest = BadRequest;
//# sourceMappingURL=bad-request.js.map