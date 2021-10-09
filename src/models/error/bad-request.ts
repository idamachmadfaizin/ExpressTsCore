import { GeneralError } from './general-error';

export class BadRequest extends GeneralError {
  constructor(message?: string) {
    super();
    this.message = message ?? 'Bad Request';
  }
}
