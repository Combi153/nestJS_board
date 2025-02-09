import { Post } from '../domain/entities/post.entity';

export class CreatePostDto {
  writer: string;
  content: string;

  constructor(writer: string, content: string) {
    this.writer = writer;
    this.content = content;
  }

  toPost(): Post {
    return Post.create(this.writer, this.content);
  }
}
