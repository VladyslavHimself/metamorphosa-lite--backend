import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/user/auth.guard';
import { User } from 'src/user/user.decorator';
import { PatternEntity } from './pattern.entity';
import { PatternService } from './pattern.service';

@ApiBearerAuth()
@ApiTags('Patterns')
@UseGuards(AuthGuard)
@Controller()
export class PatternController {
  constructor(private readonly patternService: PatternService) {}

  @ApiOperation({ summary: 'Get pattern by id' })
  @ApiParam({
    name: 'id',
    example: 6,
    description: 'get pattern by id',
  })
  @ApiResponse({ status: 200, type: PatternEntity })
  @Get('pattern/:id')
  async getAllPatternById(@Param('id') id: number): Promise<PatternEntity> {
    return await this.patternService.getPatternById(id);
  }

  @ApiOperation({ summary: 'Get user patterns' })
  @ApiParam({
    name: 'topic',
    example: 'excercise',
    description: 'topic for pattern',
  })
  @ApiResponse({ status: 200, type: [PatternEntity] })
  @Get('patterns/:topic')
  async getAllPatterns(
    @Param('topic') topic: string,
    @User('id') userId: number,
  ): Promise<PatternEntity[]> {
    return await this.patternService.getAllPatterns(
      topic.toLowerCase(),
      userId,
    );
  }

  @ApiOperation({ summary: 'Create pattern' })
  @ApiParam({
    name: 'topic',
    example: 'excercise',
    description: 'topic for pattern',
  })
  @ApiResponse({ status: 200, type: PatternEntity })
  @Post('patterns/:topic')
  async createPattern(
    @Param('topic') topic: string,
    @Body() body: {},
    @User('id') userId: number,
  ): Promise<PatternEntity> {
    return await this.patternService.createPattern(
      topic.toLowerCase(),
      body,
      userId,
    );
  }

  @ApiOperation({ summary: 'Edit pattern by id' })
  @ApiParam({ name: 'id', example: 8, description: 'id for pattern' })
  @ApiResponse({ status: 200, type: PatternEntity })
  @Put('patterns/:id')
  async editPattern(
    @Param('id') id: number,
    @Body() body: {},
    @User('id') userId: number,
  ): Promise<any> {
    return await this.patternService.editPattern(id, body, userId);
  }

  @ApiOperation({ summary: 'Delete pattern by id' })
  @ApiParam({ name: 'id', example: 8, description: 'id for pattern' })
  @Delete('patterns/:id')
  async deletePattern(@Param('id') id: number, @User('id') userId: number) {
    return await this.patternService.deleteById(id, userId);
  }
}
