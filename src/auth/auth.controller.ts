import { BadRequestException, Body, Controller, Post, Session } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login-user.dto";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto)
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