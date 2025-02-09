import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../../common/entities/common-entity';

@Entity('posts')
export class Post extends CommonEntity {
  @Column()
  writer: string;

  @Column()
  content: string;

  static create(writer: string, content: string): Post {
    if (writer === 'admin') {
      throw new Error('작성자는 admin 일 수 없습니다.');
    }

    const post = new Post();
    post.writer = writer;
    post.content = content;
    return post;
  }
}
