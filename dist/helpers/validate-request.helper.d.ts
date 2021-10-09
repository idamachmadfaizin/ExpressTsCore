import { Request } from 'express';
import { ObjectSchema } from 'joi';
/**
 * Joi validation request helper
 * @param req Request
 * @param schema Model scheme
 */
export declare function validateRequestHelper(req: Request, schema: ObjectSchema): void;
