import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { UserResource } from './resources/user.resource';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  public async register(@Body() body) {
    const { email, first_name, last_name, password } = body;
    const newUser = User.create({ email, first_name, last_name, password });
    const user = await newUser.save();
    const token = await this.authService.login(user);

    return {
      ...token,
      ...UserResource(user),
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Request() req) {
    const token = await this.authService.login(req.user);

    return {
      ...token,
      ...UserResource(req.user),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  public async me(@Request() req) {
    const user = await User.findOne({ id: req.user.id });
    return UserResource(user);
  }
}
