import {
  Controller,
  Post,
  Body,
  Session,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    const existingUser = await this.userService.findByUsername(username);
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }
    return this.userService.createUser(username, password);
  }

  @Post('login')
  async login(
    @Body() body: { username: string; password: string },
    @Session() session: Record<string, any>,
  ) {
    const user = await this.userService.validateUser(
      body.username,
      body.password,
    );
    if (!user) {
      throw new BadRequestException('Invalid username or password');
    }
    session.userId = user.id;
    console.log('Session after login:', session);
    return { message: 'Logged in successfully' };
  }

  @Post('logout')
  logout(@Session() session: Record<string, any>) {
    console.log('Session before logout:', session);
    session.destroy((err) => {
      if (err) {
        throw new BadRequestException('Failed to log out');
      }
    });
    return { message: 'Logged out successfully' };
  }
}
