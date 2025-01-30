import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import {
  CommonRepository,
  Query,
} from '../../common/repositories/common-repository';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserRepository implements CommonRepository<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(User.of(dto.name, dto.email));
  }

  findById(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  findMany(ids: string[]): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  findAll(query: Query): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  update(id: string, dto: any): Promise<User> {
    throw new Error('Method not implemented.');
  }

  remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
