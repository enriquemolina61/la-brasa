import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsUUID(undefined, { each: true })
  @ApiProperty({
    description: 'User id',
    example: '3933ac20-2f8a-47ba-bff7-1dec007620f7',
  })
  userId: string;

  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: 'Numero da mesa:',
    example: 1,
  })
  tableNumber: number;

  @IsUUID(undefined, { each: true })
  @ApiProperty({
    description: 'Lista com id dos produtos:',
    example:
      '["a7d00131-e601-4edd-bc3e-2373fd2a9962", "a7d00131-e601-4edd-bc3e-2373fd2a9962"]',
  })
  products: string[];
}
