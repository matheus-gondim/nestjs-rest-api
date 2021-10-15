import { ConfigService } from '@nestjs/config';
import { IPayload } from './../../../dist/auth/jwt/payload.d';
import { UserService } from './../../user/user.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: IPayload) {
    const { userId } = payload;
    const user = this.userService.findById(userId);
    if (!user) throw new UnauthorizedException();
    return { userId };
  }
}
