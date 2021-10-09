import { IPayload } from './payload.interface';
import { Request } from 'express';
export interface IRequest extends Request {
    user?: IPayload;
}
