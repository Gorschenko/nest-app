import { Body, Controller, Post } from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {

  @Post('register')
  async register(@Body() dto: AuthDto) {

  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {

  }
}
