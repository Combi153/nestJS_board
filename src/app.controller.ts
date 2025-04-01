import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('log-test')
  getError(): void {
    throw new Error('Error');
  }

  @Get('log-test-not-found')
  getNotFoundError(): void {
    throw new NotFoundException('Error');
  }

  @Get('log-test-internal-server')
  getInternalServerError(): void {
    throw new InternalServerErrorException('Error');
  }
}
