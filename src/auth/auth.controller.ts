import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenResponse } from './dto/token-response.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserResponse } from '../users/dto/user-response.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '로그인 요청',
  })
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({ type: TokenResponse })
  async signIn(@Request() req): Promise<TokenResponse> {
    return this.authService.signIn(req.user);
  }

  @ApiOperation({
    summary: '회원가입 요청',
  })
  @Post('register')
  @ApiCreatedResponse({
    type: UserResponse,
  })
  async signUp(@Body() dto: CreateUserDto): Promise<UserResponse> {
    return await this.authService.signUp(dto);
  }
}
