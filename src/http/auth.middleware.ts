/**
 * @author Idam Achmad Faizin
 * @date 2020-12-06 21:55:34
 */
import { StringHelper } from '@helpers/index';
import { IRequest } from '@models/index';
import { Forbidden, Unauthorized } from '@models/error';
import { NextFunction, RequestHandler, Response } from 'express';
import jwt from 'express-jwt';

export function authUnless(pathsExclude?: (string | RegExp)[], base?: string): RequestHandler {
  if (process.env.TOKEN_SECRET) throw new Error("TOKEN_SECRET in .env required");

  const secret: string = process.env.TOKEN_SECRET ?? '';

  const path = pathsExclude?.map(p => typeof p === 'string' ? StringHelper.urlPrefix(base ? `${base}${p}` : p) : p);

  return jwt({ secret, algorithms: ['HS256'] }).unless({
    path,
  });
}

export function roles(hasRoles: string | string[] = []) {
  const newRoles: string[] =
    typeof hasRoles === 'string' ? [hasRoles] : hasRoles;

  return [
    async (req: IRequest, res: Response, next: NextFunction) => {
      const payload = req.user;
      if (!payload)
        return next(new Unauthorized('Unauthorized'));

      if (newRoles.filter(x => payload?.roles.includes(x))?.length === 0)
        return next(new Forbidden('Do not have permission'));

      next();
    },
  ];
}
