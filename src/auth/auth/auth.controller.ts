import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service';
import {User} from '../user.entity';
import {AuthGuard} from '@nestjs/passport';
import { Request } from 'express';
import {UserService} from '../user/user.service';
import {ValidationPipe} from '../validation.pipe';
import {RegistryUserDto} from '../dto/registry-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() user: User): Promise<any> {
    const u = await this.userService.login(user);
    const accessToken = await this.authService.createToken({id: u.id});
    return {
      expires_in: 3600,
      access_token: accessToken,
    };
  }

  @Post('register')
  async register(@Body(new ValidationPipe()) registryUserDto: RegistryUserDto): Promise<any> {
    return this.authService.registry(registryUserDto as User);
  }

  @Get('user')
  @UseGuards(AuthGuard())
  async user(@Req() request: Request): Promise<any> {
    // @ts-ignore
    return request.user;
  }
}