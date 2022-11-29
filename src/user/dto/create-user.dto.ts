import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'Nome do usuário, apenas para exibição.',
    example: 'João da Silva',
  })
  name: string;
  @IsString()
  @ApiProperty({
    description: 'Nome de usuário e deve ser unico',
    example: 'Joãzinho',
  })
  nickname: string;
  @IsString()
  @MinLength(6)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message:
      'Senha fraca. Deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial.',
  })
  @ApiProperty({
    description:
      'Senha do usuário, deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial.',
    example: 'Senha123@',
  })
  password: string;
  @ApiProperty({
    description: 'A confirmação da senha deve ser igual a senha digitada.',
    example: 'Senha123@',
  })
  confirmPassword: string;
  @IsUrl()
  @ApiProperty({
    description: 'URL da imagem do usuário.',
    example: 'https://avatars.githubusercontent.com/u/76474854',
  })
  image: string;
}
