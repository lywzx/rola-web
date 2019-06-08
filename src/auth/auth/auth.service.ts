import { Injectable } from '@nestjs/common';
import {UserService} from '../user/user.service';
import {JwtService} from '@nestjs/jwt';
import {User} from '../user.entity';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  public async validate(userData: User): Promise<User> {
    return userData.user_name ? await this.userService.findByUserName(userData.user_name) : await this.userService.findByEmail(userData.email);
  }

  public async login(user: User): Promise<any | {status: number}> {
    return this.validate(user).then((userData) => {
      if (!userData) {
        return {
          status: 404,
        };
      }

      if ( crypto.createHmac('sha256', user.password).digest('hex') !== userData.password ) {
        return {
          status: 401,
          message: '用户名不存在或密码错误',
        };
      }

      const payload = `${userData.name}${userData.id}`;
      const accessToken = this.jwtService.sign(payload);

      return {
        expires_in: 3600,
        access_token: accessToken,
        user_id: payload,
        status: 200,
      };
    });
  }

  public async registry(user: User): Promise<any> {
    return this.userService.create(user);
  }

  public async userInfo(token: string): Promise<any> {
    return Promise.resolve({});
  }

}
