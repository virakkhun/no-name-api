import { HttpStatus } from '@nestjs/common';

export interface IMessage {
  statusCode: HttpStatus;
  message: string;
}
