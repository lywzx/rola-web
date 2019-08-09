import {Injectable} from '@nestjs/common';
import {UserService} from '../user/user.service';
import {JwtService} from '@nestjs/jwt';
import { UserEntity } from '../../../entity/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  public async validate(userData: UserEntity): Promise<UserEntity> {
    return userData.user_name ? await this.userService.findByUserName(userData.user_name) : await this.userService.findByEmail(userData.email);
  }

  public async createToken(payload: {id: number}): Promise<string> {
    return this.jwtService.sign(payload);
  }

  public async registry(user: UserEntity): Promise<any> {
    return this.userService.create(user);
  }

  public async validateUser(token: string): Promise<any> {
    return Promise.resolve({});
  }

}
