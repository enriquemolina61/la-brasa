import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString, IsUUID } from 'class-validator';

export class CreateOrderProductDto {
  @IsUUID(undefined, { each: true })
  @ApiProperty({
    description: 'Id do produto:',
    example: 'a7d00131-e601-4edd-bc3e-2373fd2a9962',
  })
  productId: string;

  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: 'Quantidade do produto:',
    example: 1,
  })
  quantity: number;

  @IsString()
  @ApiProperty({
    description: 'Detalhes do pedido do produto:',
    example: 'Sem milho',
  })
  details: string;
}
