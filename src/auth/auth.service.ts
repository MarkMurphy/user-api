import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserService } from '../user';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUserCredentials(
    username: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.userService.getUserByEmail(username);

    if (user) {
      if (await this.userService.verifyPassword(password, user.passwordHash)) {
        return user;
      }
    }

    return undefined;
  }

  async createToken(user: User) {
    const exp = Date.now() / 1000 + 3600;

    const payload = {
      sub: user.id,
      exp,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      expiresAt: new Date(exp * 1000),
    };
  }
}
