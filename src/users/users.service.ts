import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user-repository';
import { UserResponse } from './dto/user-response.dto';
import { hash } from './utils/hashing';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(dto: CreateUserDto): Promise<UserResponse> {
    const hashedPassword = await hash(dto.password);
    const user = await User.of(dto.name, dto.email, hashedPassword);

    const result = await this.userRepository.create(user);
    const { password, ...userResponse } = result;

    return userResponse;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
