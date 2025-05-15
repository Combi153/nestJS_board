import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { TokenResponse } from './dto/token-response.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signIn(email: string, password: string): Promise<TokenResponse> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user || !(await user.isPasswordValid(password))) {
      throw new UnauthorizedException();
    }

    return { accessToken: 'jwt' };
  }
}
