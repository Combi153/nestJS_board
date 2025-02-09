import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  writer: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
