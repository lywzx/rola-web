import {Body, Controller, Get, Post, Req, UseGuards, ValidationPipe} from '@nestjs/common';
import {AuthService} from './auth.service';
import { UserEntity } from '../../entity/user.entity';
import {AuthGuard} from '@nestjs/passport';
import { Request } from 'express';
import {UserService} from '../user/user.service';
import {RegistryUserDto} from '../dto/registry-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() user: UserEntity): Promise<any> {
    const u = await this.userService.login(user);
    const accessToken = await this.authService.createToken({id: u.id});
    return {
      expires_in: 3600,
      access_token: accessToken,
    };
  }

  @Post('register')
  async register(@Body(new ValidationPipe({transform: true})) registryUserDto: RegistryUserDto): Promise<any> {
    const user = await this.authService.registry(registryUserDto as UserEntity);
    return {
      id: user.id,
    };
  }

  @Get('user')
  @UseGuards(AuthGuard())
  async user(@Req() request: Request): Promise<any> {
    // @ts-ignore
    return request.user;
  }
}
