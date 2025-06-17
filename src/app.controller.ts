import {
  Body,
  Controller,
  Get,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('sum')
  getSum(@Body() body: { a: number; b: number }) {
    const { a, b } = body;
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new BadRequestException('Invalid input: a and b must be numbers');
    }
    return { result: this.appService.getSum(a, b) };
  }
}
