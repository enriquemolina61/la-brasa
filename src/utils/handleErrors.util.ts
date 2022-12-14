import { NotFoundException } from '@nestjs/common';

export function errorHandler(error: Error): undefined {
  const message = error.message?.split('\n');
  const lastmessage = message[message.length - 1]?.trim();
  throw new NotFoundException(lastmessage || 'Algum erro ocorreu');
}
