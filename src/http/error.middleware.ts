import { LogHelper } from '@helpers/index';
import { GeneralError, BadRequest, NotFound, Unauthorized, Forbidden } from '@models/error';
import { BaseResponse } from '@models/response.model';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

/**
 * Error response handler
 * @param err Error
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @return BaseResponse
 */
export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  /** Global error handle */
  if (err instanceof GeneralError) {
    writeError(req.method, req.path, getCode(err), err.message);
    return res
      .status(getCode(err))
      .json(new BaseResponse(err.message, null, undefined, { success: false }));
  }

  /** Handle express-jwt */
  if (err.name === 'UnauthorizedError') {
    writeError(req.method, req.path, StatusCodes.UNAUTHORIZED, err.message);
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(new BaseResponse(err.message, null, undefined, { success: false }));
  }

  /** Internal server error handle */
  writeError(req.method, req.path, StatusCodes.INTERNAL_SERVER_ERROR, err.message);
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json(new BaseResponse(err.message, null, undefined, { success: false }));
}

function writeError(method: string, path: string, code: StatusCodes, message: string) {
  const logHelper = new LogHelper();
  logHelper.error(`[${method}] ${path} >> StatusCode:: ${code}, Message:: ${message}`);
}

/**
 * Get Error code instanceof error
 * @param err Error
 * @return Http status code
 */
function getCode(err: Error): StatusCodes {
  switch (true) {
    case err instanceof BadRequest:
      return StatusCodes.BAD_REQUEST;
    case err instanceof NotFound:
      return StatusCodes.NOT_FOUND;
    case err instanceof Unauthorized:
      return StatusCodes.UNAUTHORIZED;
    case err instanceof Forbidden:
      return StatusCodes.FORBIDDEN;
    default:
      return StatusCodes.INTERNAL_SERVER_ERROR;
  }
}
