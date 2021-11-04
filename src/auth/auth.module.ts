import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity } from './entities/user.entity';
import { JwtStratagy } from './strategies/jwt.stratagy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register(
      {
        secret: 'SuperSecret',
        signOptions: { expiresIn: '30m' },
      }
    ),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStratagy],
})
export class AuthModule {}
