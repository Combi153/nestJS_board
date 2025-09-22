import { Injectable, NotFoundException } from '@nestjs/common';
import { FindPostDto } from 'src/posts/dto/find-post.dto';
import { Post } from './domain/entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './repositories/posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async create(dto: CreatePostDto): Promise<Post> {
    const post = Post.create(dto.writer, dto.title, dto.content);
    return await this.postsRepository.save(post);
  }

  async findAll(query: FindPostDto): Promise<Post[]> {
    return await this.postsRepository.findAll(query);
  }

  async count(query: FindPostDto): Promise<number> {
    return await this.postsRepository.count(query);
  }

  async findOne(id: string): Promise<Post> {
    return await this.postsRepository.findById(id);
  }

  async update(id: string, dto: UpdatePostDto): Promise<Post> {
    const post = await this.postsRepository.findById(id);
    if (!post) {
      throw new NotFoundException(`Post 가 존재하지 않습니다 id : ${id}`);
    }

    if (dto.writer) {
      post.updateWriter(dto.writer);
    }
    if (dto.title) {
      post.updateTitle(dto.title);
    }
    if (dto.content) {
      post.updateContent(dto.content);
    }

    return await this.postsRepository.save(post);
  }

  async remove(id: string): Promise<void> {
    const post = await this.postsRepository.findById(id);
    if (!post) {
      throw new NotFoundException(`Post 가 존재하지 않습니다 id : ${id}`);
    }
    await this.postsRepository.remove(post);
  }
}
