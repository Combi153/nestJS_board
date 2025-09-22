import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsQuery } from 'src/posts/repositories/posts.query';
import { Repository } from 'typeorm';
import { Post } from '../domain/entities/post.entity';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(Post)
    private readonly typeOrmRepository: Repository<Post>,
  ) {}

  async save(post: Post): Promise<Post> {
    return await this.typeOrmRepository.save(post);
  }

  async findById(id: string): Promise<Post> {
    return await this.typeOrmRepository.findOneBy({ id });
  }

  async findAll(query: PostsQuery): Promise<Post[]> {
    return await this.typeOrmRepository.find({
      where: {
        ...(query.writer && { writer: query.writer }),
        ...(query.content && { content: query.content }),
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    });
  }

  async count(query: PostsQuery): Promise<number> {
    return await this.typeOrmRepository.count({
      where: {
        ...(query.writer && { writer: query.writer }),
        ...(query.content && { content: query.content }),
      },
    });
  }

  async remove(post: Post): Promise<void> {
    await this.typeOrmRepository.remove(post);
  }
}
