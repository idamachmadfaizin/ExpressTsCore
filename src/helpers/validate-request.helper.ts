import { BadRequest } from '@models/error';
import { Request } from 'express';
import { ObjectSchema, ValidationOptions } from 'joi';

/**
 * Joi validation request helper
 * @param req Request
 * @param schema Model scheme
 */
export function validateRequestHelper(req: Request, schema: ObjectSchema) {
  const options: ValidationOptions = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const validateResult = schema.validate(req.body, options);

  if (validateResult.error) {
    throw new BadRequest(validateResult.error.details.map(detail => detail.message).join(' & '));
  } else {
    req.body = validateResult.value;
  }
}
