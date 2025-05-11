import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenResponse } from './dto/token-response.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('sign-in')
  async signIn(@Body() dto: CreateUserDto): Promise<TokenResponse> {
    const user = await this.userService.create(dto);

    return { accessToken: user.id };
  }
}
