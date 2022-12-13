import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export class LoginResponseDto {
  @ApiProperty({
    description: ' JWT - Token de acesso:',
    example: 'TOKEN_GERADO_AQUI',
  })
  token: string;

  @ApiProperty({
    description: 'Usuario autenticado:',
  })
  user: User;
}
