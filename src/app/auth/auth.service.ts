import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { DeepPartial } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(newUser: DeepPartial<User>): Promise<void> {
    newUser.password = await bcrypt.hash(newUser.password, 10);
    await this.usersService.create(newUser);
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(email);

    if (!user) throw new UnauthorizedException();

    const result = await bcrypt.compare(password, user.password);

    if (!result) throw new UnauthorizedException();

    const payload = { sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
