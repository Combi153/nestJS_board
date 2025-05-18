import { ApiProperty } from '@nestjs/swagger';

export class TokenResponse {
  @ApiProperty({
    example: 'xxx.yyy.zzz',
  })
  accessToken: string;
}
