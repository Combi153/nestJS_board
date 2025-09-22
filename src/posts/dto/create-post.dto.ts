import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: 'writer',
  })
  @IsString()
  @IsNotEmpty()
  writer: string;

  @ApiProperty({
    example: 'title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'content',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
