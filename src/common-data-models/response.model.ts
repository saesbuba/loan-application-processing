import { HttpStatus } from '@nestjs/common';

export interface ResponseModel<T> {
  success: boolean;
  statusCode: HttpStatus;
  message: string;
  data: Array<T> | T;
}
