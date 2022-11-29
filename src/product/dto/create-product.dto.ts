import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @ApiProperty({
    description: 'Nome do Produto',
    example: 'Coca-Cola',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'Descrição do Produto',
    example: 'Refrigerante de Cola',
  })
  description: string;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @ApiProperty({
    description: 'Preço do Produto',
    example: 5.5,
  })
  price: number;
  @IsUrl()
  @ApiProperty({
    description: 'Imagem do Produto',
    example:
      'https://tdc099.vtexassets.com/arquivos/ids/184011/FOTOSVTEX.jpg?v=637731910440870000',
  })
  image: string;
}
