import { PostCategory } from '../domain/enum/category.enum';
import { Post } from '../domain/entities/post.entity';

export class CreatePostDto {
  writer: string;
  type: PostCategory;
  title: string;
  content: string;

  toPost(): Post {
    return new Post({
      writer: this.writer,
      type: this.type,
      title: this.title,
      content: this.content,
    });
  }
}
