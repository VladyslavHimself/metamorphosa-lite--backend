import { Module } from '@nestjs/common';
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
    JwtModule.register({ secret: 'SuperSecret'}),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStratagy]
})
export class AuthModule {}
