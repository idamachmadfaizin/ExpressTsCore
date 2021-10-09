import { IRequest } from '@models/index';
import { NextFunction, RequestHandler, Response } from 'express';
export declare function authUnless(pathsExclude?: (string | RegExp)[], base?: string): RequestHandler;
export declare function roles(hasRoles?: string | string[]): ((req: IRequest, res: Response, next: NextFunction) => Promise<void>)[];
