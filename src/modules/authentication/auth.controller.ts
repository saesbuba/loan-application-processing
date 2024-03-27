import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { LogIn } from './dto/log-in.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() logInDto: LogIn) {
    return await this.authService.login(logInDto.username, logInDto.password);
  }
}
