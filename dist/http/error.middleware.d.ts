import { NextFunction, Request, Response } from 'express';
/**
 * Error response handler
 * @param err Error
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @return BaseResponse
 */
export declare function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>>;
