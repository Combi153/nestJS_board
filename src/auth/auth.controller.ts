import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenResponse } from './dto/token-response.dto';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('login')
  @ApiOkResponse({ type: TokenResponse })
  async signIn(@Body() dto: SignInDto): Promise<TokenResponse> {
    return await this.authService.signIn(dto.email, dto.password);
  }
}
