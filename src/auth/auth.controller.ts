import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenResponse } from './dto/token-response.dto';
import { SignInDto } from './dto/sign-in.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserResponse } from '../users/dto/user-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '로그인 요청',
  })
  @Post('login')
  @ApiOkResponse({ type: TokenResponse })
  async signIn(@Body() dto: SignInDto): Promise<TokenResponse> {
    return await this.authService.signIn(dto.email, dto.password);
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
