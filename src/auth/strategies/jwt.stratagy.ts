import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class JwtStratagy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: new ConfigService().get('JWT_SECRET'),
    });
  }
  async validate({ email }: Pick<UserEntity, 'email'>) {
    return email;
  }
}
