import {PassportStrategy} from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {Injectable} from '@nestjs/common';
import {AuthService} from './auth/auth.service';
import {User} from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret1234567',
    });
  }

  async validate(payload: User) {
    const user = await this.authService.validate(payload);

  }
}
