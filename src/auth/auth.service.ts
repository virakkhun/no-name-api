import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import configuration from '../config/configuration';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.fineOne(email);

    if (user.password === password) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    if (user) {
      return {
        access_token: this.jwtService.sign(
          {
            data: user._doc,
          },
          {
            secret: configuration().JWT_SECRET_KEY,
            expiresIn: 60 * 60 * 24 * 7,
          },
        ),
      };
    }

    return new BadRequestException('Not Found User');
  }
}
