import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export class LoginResponseDto {
  @ApiProperty({
    description: ' JWT - Token de acesso:',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVucmlxdWVAZW1haWwuY29tIiwiaWF0IjoxNjcwOTY2MzMxLCJleHAiOjE2NzEzMTE5MzF9.XLYiIzMab2nCcb_jawXbxvzsqHeUXx6qWz1z1MNvnoI',
  })
  token: string;

  @ApiProperty({
    description: 'Usuario autenticado.',
  })
  user: User;
}
