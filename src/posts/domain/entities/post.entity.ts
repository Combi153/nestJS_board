import { PostCategory } from '../enum/category.enum';

export class Post {
  id: string;
  writer: string;
  type: PostCategory;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    writer,
    type,
    title,
    content,
    createdAt,
    updatedAt,
  }: {
    id?: string;
    writer: string;
    type: PostCategory;
    title: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = id;
    this.writer = writer;
    this.type = type;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
