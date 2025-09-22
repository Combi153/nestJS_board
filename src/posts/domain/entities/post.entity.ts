import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../../common/entities/common-entity';

@Entity('posts')
export class Post extends CommonEntity {
  @Column()
  writer: string;

  @Column()
  title: string;

  @Column()
  content: string;

  static create(writer: string, title: string, content: string): Post {
    Post.validateWriter(writer);

    const post = new Post();
    post.writer = writer;
    post.title = title;
    post.content = content;
    return post;
  }

  private static validateWriter(writer: string): void {
    if (writer === 'admin') {
      throw new Error('작성자는 admin 일 수 없습니다.');
    }
  }

  updateWriter(writer: string): void {
    Post.validateWriter(writer);
    this.writer = writer;
  }

  updateTitle(title: string): void {
    this.title = title;
  }

  updateContent(content: string): void {
    this.content = content;
  }
}
