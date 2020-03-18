import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
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
      throw new UnauthorizedException();
    }

    return this.authService.createToken(user);
  }
}
