import { HttpStatus } from '@nestjs/common';

export interface Response<T> {
  success: boolean;
  statusCode: HttpStatus;
  message: string;
  data: Array<T> | T;
}
