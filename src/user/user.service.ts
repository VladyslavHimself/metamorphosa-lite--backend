import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, genSalt, hash } from 'bcryptjs';
import { UserEntity } from './user.entity';
import { UserBodyDto } from './dto/userBody.dto';
import { sign, verify } from 'jsonwebtoken';
import { JwtPayloadDto } from './dto/jwtPayload.dto';
import { TokensDto } from './dto/tokens.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(body: UserBodyDto): Promise<UserEntity> {
    const user = this.userRepository.create();
    body.password = await hash(body.password, await genSalt(12));
    Object.assign(user, body);
    return await this.userRepository.save(user);
  }

  async validateUser({ email, password }: UserBodyDto) {
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('user this email is not create');
    }
    const isCorrectPassword = await compare(password, user.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException('ivalid password');
    }
    return user;
  }

  async loginUser(user: UserEntity): Promise<TokensDto> {
    const payload = { id: user.id, email: user.email };
    const refreshToken = this.generateJWT(
      payload,
      process.env.JWT_REFRESH_SECRET,
      '30d',
    );
    const accessToken = this.generateJWT(
      payload,
      process.env.JWT_ACCESS_SECRET,
      '30m',
    );
    await this.userRepository.update(user.id, { token: refreshToken });
    return { refreshToken, accessToken };
  }

  async refresh(refreshToken: string): Promise<string> {
    if (!this.validateJWT(refreshToken, process.env.JWT_REFRESH_SECRET)) {
      throw new UnauthorizedException('invalid refresh token');
    }
    const user = await this.userRepository.findOne({ token: refreshToken });
    if (!user) {
      throw new UnauthorizedException('refresh token does not match the base');
    }
    const payload = { id: user.id, email: user.email };
    return this.generateJWT(payload, process.env.JWT_ACCESS_SECRET, '30m');
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ email });
  }

  private validateJWT(token: string, secret: string): boolean {
    try {
      verify(token, secret);
      return true;
    } catch {
      return false;
    }
  }

  private generateJWT(
    payload: JwtPayloadDto,
    secret: string,
    expires: string,
  ): string {
    return sign(payload, secret, { expiresIn: expires });
  }
}
