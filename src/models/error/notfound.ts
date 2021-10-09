import { GeneralError } from './general-error';

export class NotFound extends GeneralError {
  constructor(message?: string) {
    super();
    this.message = message ?? 'Notfound';
  }
}
