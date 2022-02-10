import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import eachMonthOfInterval from 'date-fns/eachMonthOfInterval';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  public async validateUser(username, password): Promise<Partial<User> | null> {
    const user = await User.createQueryBuilder()
      .where('email = :email', { email: username })
      .getOne();

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return null;
    }

    return user;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
