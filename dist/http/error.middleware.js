"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const index_1 = require("@helpers/index");
const error_1 = require("@models/error");
const response_model_1 = require("@models/response.model");
const http_status_codes_1 = require("http-status-codes");
/**
 * Error response handler
 * @param err Error
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @return BaseResponse
 */
function errorMiddleware(err, req, res, next) {
    /** Global error handle */
    if (err instanceof error_1.GeneralError) {
        writeError(req.method, req.path, getCode(err), err.message);
        return res
            .status(getCode(err))
            .json(new response_model_1.BaseResponse(err.message, null, undefined, { success: false }));
    }
    /** Handle express-jwt */
    if (err.name === 'UnauthorizedError') {
        writeError(req.method, req.path, http_status_codes_1.StatusCodes.UNAUTHORIZED, err.message);
        return res
            .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
            .json(new response_model_1.BaseResponse(err.message, null, undefined, { success: false }));
    }
    /** Internal server error handle */
    writeError(req.method, req.path, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    return res
        .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
        .json(new response_model_1.BaseResponse(err.message, null, undefined, { success: false }));
}
exports.errorMiddleware = errorMiddleware;
function writeError(method, path, code, message) {
    const logHelper = new index_1.LogHelper();
    logHelper.error(`[${method}] ${path} >> StatusCode:: ${code}, Message:: ${message}`);
}
/**
 * Get Error code instanceof error
 * @param err Error
 * @return Http status code
 */
function getCode(err) {
    switch (true) {
        case err instanceof error_1.BadRequest:
            return http_status_codes_1.StatusCodes.BAD_REQUEST;
        case err instanceof error_1.NotFound:
            return http_status_codes_1.StatusCodes.NOT_FOUND;
        case err instanceof error_1.Unauthorized:
            return http_status_codes_1.StatusCodes.UNAUTHORIZED;
        case err instanceof error_1.Forbidden:
            return http_status_codes_1.StatusCodes.FORBIDDEN;
        default:
            return http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    }
}
//# sourceMappingURL=error.middleware.js.map