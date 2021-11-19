import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserBodyDto } from './dto/userBody.dto';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { UserEntity } from './user.entity';
import { TokensDto } from './dto/tokens.dto';
import { User } from './user.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Registration' })
  @ApiResponse({ status: 201, type: UserEntity })
  @UsePipes(new ValidationPipe())
  @Post('registration')
  async registration(@Body() body: UserBodyDto): Promise<UserEntity> {
    body.email = body.email.toLowerCase();
    if (await this.userService.findUserByEmail(body.email)) {
      throw new UnauthorizedException('user on db');
    }
    return await this.userService.createUser(body);
  }

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 200,
    description:
      'get new access token. Access token life in 30 minuts, Refresh token set http-only cookie',
    type: TokensDto,
  })
  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(
    @Body() body: UserBodyDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<TokensDto> {
    body.email = body.email.toLowerCase();
    const validUser = await this.userService.validateUser(body);
    const tokens = await this.userService.loginUser(validUser);
    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      maxAge: 2592000000, // 1000 * 60 * 60 * 24 * 30
    });
    return tokens;
  }

  @ApiOperation({ summary: 'Refresh' })
  @ApiResponse({ status: 200, description: 'back acces token' })
  @Get('refresh')
  async refresh(@Req() request: Request): Promise<Object> {
    const refreshToken = request.cookies['refreshToken'];
    if (!refreshToken) {
      throw new UnauthorizedException('missing refresh token');
    }
    return { accessToken: await this.userService.refresh(refreshToken) };
  }
}
