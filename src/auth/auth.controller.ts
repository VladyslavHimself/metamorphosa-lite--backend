import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { isObject } from 'class-validator';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { UserEntity } from './entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Registration' })
  @ApiResponse({ status: 201, type: UserEntity })
  @UsePipes(new ValidationPipe())
  @Post('registration')
  async create(@Body() body: AuthDto): Promise<UserEntity> {
    const user = await this.authService.findUser(body.email);
    if (isObject(user)) {
      throw new UnauthorizedException('user on db');
    }
    return await this.authService.createUser(body);
  }

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'back acces token' })
  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() { email, password }: AuthDto) {
    const user = await this.authService.validateUser(email, password);
    return await this.authService.login(user.email, user.id);
  }
}
