import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonEntity } from '../../../common/entities/common-entity';
import { Post } from './post.entity';

@Entity('comments')
export class Comment extends CommonEntity {
  @Column()
  writer: string;

  @Column()
  content: string;

  @ManyToOne(() => Comment)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  constructor(writer: string, content: string) {
    super();
    this.writer = writer;
    this.content = content;
  }
}
