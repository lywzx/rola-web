import {Injectable} from '@nestjs/common';
import {UserService} from '../user/user.service';
import {JwtService} from '@nestjs/jwt';
import {User} from '../user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  public async validate(userData: User): Promise<User> {
    return userData.user_name ? await this.userService.findByUserName(userData.user_name) : await this.userService.findByEmail(userData.email);
  }

  public async createToken(payload: {id: number}): Promise<string> {
    return this.jwtService.sign(payload);
  }

  public async registry(user: User): Promise<any> {
    return this.userService.create(user);
  }

  public async validateUser(token: string): Promise<any> {
    return Promise.resolve({});
  }

}
