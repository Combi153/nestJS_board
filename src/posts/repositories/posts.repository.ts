import { Injectable } from '@nestjs/common';
import { Post } from '../domain/entities/post.entity';
import { db } from '../../index';
import { postModel } from '../../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class PostsRepository {
  async save(post: Post): Promise<Post> {
    const id = await db
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
    const record = await db
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
