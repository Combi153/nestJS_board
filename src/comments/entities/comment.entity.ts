import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonEntity } from '../../common/entities/common-entity';
import { Post } from '../../posts/domain/entities/post.entity';

const MIN_WRITER_LENGTH = 1;
const MAX_WRITER_LENGTH = 7;

const MIN_CONTENT_LENGTH = 1;
const MAX_CONTENT_LENGTH = 100;

@Entity('comments')
export class Comment extends CommonEntity {
  @Column()
  writer: string;

  @Column()
  content: string;

  @ManyToOne(() => Post, { eager: true })
  @JoinColumn({ name: 'post_id' })
  post: Post;

  static create(params: {
    writer: string;
    content: string;
    post: Post;
  }): Comment {
    this.validateWriterLength(params.writer);
    this.validateContentLength(params.content);

    const comment = new Comment();
    comment.writer = params.writer;
    comment.content = params.content;
    comment.post = params.post;
    return comment;
  }

  private static validateWriterLength(writer: string) {
    if (
      writer.length < MIN_WRITER_LENGTH ||
      writer.length > MAX_WRITER_LENGTH
    ) {
      throw new Error(
        `작성자 이름은 ${MIN_WRITER_LENGTH} 글자 초과 ${MAX_WRITER_LENGTH} 글자 미만이어야 합니다.`,
      );
    }
  }

  private static validateContentLength(content: string) {
    if (
      content.length < MIN_CONTENT_LENGTH ||
      content.length > MAX_CONTENT_LENGTH
    ) {
      throw new Error(
        `댓글 내용은 ${MIN_CONTENT_LENGTH} 글자 초과 ${MAX_CONTENT_LENGTH} 글자 미만이어야 합니다.`,
      );
    }
  }
}
