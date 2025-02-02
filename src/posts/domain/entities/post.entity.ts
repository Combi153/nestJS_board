import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../../common/entities/common-entity';

@Entity('posts')
export class Post extends CommonEntity {
  @Column()
  writer: string;

  @Column()
  content: string;

  constructor(writer: string, content: string) {
    super();
    this.writer = writer;
    this.content = content;
  }
}
