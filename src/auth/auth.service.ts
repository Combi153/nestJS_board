import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { TokenResponse } from './dto/token-response.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserResponse } from '../users/dto/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(user: UserResponse): Promise<TokenResponse> {
    const payload = { sub: user.id, email: user.email };

    return { accessToken: await this.jwtService.signAsync(payload) };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserResponse | null> {
    const user = await this.usersService.findOneByEmail(email);

    if (user && (await user.isPasswordValid(password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signUp(dto: CreateUserDto): Promise<UserResponse> {
    const user = await this.usersService.findOneByEmail(dto.email);

    if (user) {
      throw new BadRequestException('이미 존재하는 계정입니다');
    }

    return await this.usersService.create(dto);
  }
}
