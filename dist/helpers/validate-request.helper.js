"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequestHelper = void 0;
const error_1 = require("@models/error");
/**
 * Joi validation request helper
 * @param req Request
 * @param schema Model scheme
 */
function validateRequestHelper(req, schema) {
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true, // remove unknown props
    };
    const validateResult = schema.validate(req.body, options);
    if (validateResult.error) {
        throw new error_1.BadRequest(validateResult.error.details.map(detail => detail.message).join(' & '));
    }
    else {
        req.body = validateResult.value;
    }
}
exports.validateRequestHelper = validateRequestHelper;
//# sourceMappingURL=validate-request.helper.js.map