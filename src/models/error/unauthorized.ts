import { GeneralError } from './general-error';

export class Unauthorized extends GeneralError {
  constructor(message?: string) {
    super();
    this.message = message ?? 'Unauthorized';
  }
}
