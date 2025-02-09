import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonEntity } from '../../common/entities/common-entity';
import { Post } from '../../posts/domain/entities/post.entity';

@Entity('comments')
export class Comment extends CommonEntity {
  @Column()
  writer: string;

  @Column()
  content: string;

  @ManyToOne(() => Post)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  static create(writer: string, content: string, post: Post): Comment {
    const comment = new Comment();
    comment.writer = writer;
    comment.content = content;
    comment.post = post;
    return comment;
  }
}
