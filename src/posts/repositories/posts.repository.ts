import { Injectable } from '@nestjs/common';
import { Post } from '../domain/entities/post.entity';
import { postModel } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class PostsRepository {
  constructor(private readonly database: DatabaseService) {}

  async save(post: Post): Promise<Post> {
    const id = await this.database
      .getDb()
      .insert(postModel)
      .values({
        writer: post.writer,
        type: post.type,
        title: post.title,
        content: post.content,
      })
      .$returningId()
      .then((result) => result[0].id);

    return await this.findById(id);
  }

  async findById(postId: string): Promise<Post> {
    const record = await this.database
      .getDb()
      .select()
      .from(postModel)
      .where(eq(postModel.id, postId))
      .then((results) => results[0]);

    return new Post({
      id: record.id,
      writer: record.writer,
      type: record.type,
      title: record.title,
      content: record.content,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }
}
