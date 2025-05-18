import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'huchu@email.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(PASSWORD_MAX_LENGTH)
  @MinLength(PASSWORD_MIN_LENGTH)
  password: string;

  @ApiProperty({
    example: 'huchu',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
