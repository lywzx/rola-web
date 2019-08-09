import {PassportStrategy} from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from './user/user.service';
import {config} from '../../util/helper';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config('jwt.secret'),
    });
  }

  async validate(payload: {id: number}) {
    const user = await this.userService.findById(payload.id, ['id', 'user_name', 'avatar', 'email', 'name', 'created_at', 'updated_at'], 600000);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
