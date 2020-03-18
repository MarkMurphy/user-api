import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginParams } from './dto/login.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/token')
  async login(@Body() params: LoginParams) {
    const user = await this.authService.validateUserCredentials(
      params.username,
      params.password,
    );

    if (!user) {
      throw new HttpException('Invalid username or password', 401);
    }

    return this.authService.createToken(user);
  }
}
