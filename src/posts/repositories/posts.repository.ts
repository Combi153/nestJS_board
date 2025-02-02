import { Injectable } from '@nestjs/common';
import {
  CommonRepository,
  Query,
} from '../../common/repositories/common-repository';
import { Post } from '../domain/entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PostsRepository implements CommonRepository<Post> {
  constructor(
    @InjectRepository(Post)
    private readonly typeOrmRepository: Repository<Post>,
  ) {}

  async create(dto: CreatePostDto): Promise<Post> {
    return await this.typeOrmRepository.save(dto.toPost());
  }

  async findById(id: string): Promise<Post> {
    return await this.typeOrmRepository.findOneBy({ id });
  }

  findMany(ids: string[]): Promise<Post[]> {
    throw new Error('Method not implemented.');
  }

  findAll(query: Query): Promise<Post[]> {
    throw new Error('Method not implemented.');
  }

  update(id: string, dto: UpdatePostDto): Promise<Post> {
    throw new Error('Method not implemented.');
  }

  remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
