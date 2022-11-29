import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome do usuário, apenas para exibição.',
    example: 'João da Silva',
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email do usuário e deve ser unico',
    example: 'joazinho@email.com',
  })
  email: string;

  @IsString()
  @MaxLength(11)
  @Matches(
    /^([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})*$/,
    {
      message: 'Seu CPF deve ser uma string e conter 11 números',
    },
  )
  @ApiProperty({
    description: 'Cpf do usuário',
    example: '12345678910',
  })
  cpf: string;

  @IsString()
  @IsNotEmpty()
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
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'A confirmação da senha deve ser igual a senha digitada.',
    example: 'Senha123@',
  })
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({
    description: 'URL da imagem do usuário.',
    example: 'https://avatars.githubusercontent.com/u/76474854',
  })
  image: string;
}
