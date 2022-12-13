import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsPositive, IsUUID, ValidateNested } from 'class-validator';
import { CreateOrderProductDto } from './create-order-product.dto';

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

  @ValidateNested({ each: true })
  @Type(() => CreateOrderProductDto)
  @ApiProperty({
    description: 'Lista com id dos produtos:',
    type: [CreateOrderProductDto],
  })
  products: CreateOrderProductDto[];
}
