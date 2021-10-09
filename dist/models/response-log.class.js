"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseLog = void 0;
class ResponseLog {
    constructor(method, pathname, statusCode, message) {
        this.method = method;
        this.pathname = pathname;
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.ResponseLog = ResponseLog;
//# sourceMappingURL=response-log.class.js.map