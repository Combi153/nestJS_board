import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({
    example: 'id',
  })
  id: string;

  @ApiProperty({
    example: 'huchu',
  })
  name: string;

  @ApiProperty({
    example: 'huchu@email.com',
  })
  email: string;
}
