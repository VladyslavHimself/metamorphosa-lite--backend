import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUserId } from 'src/auth/decorators/get-user-id.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ExcerciseDto } from 'src/excercise/dto/excercise.dto';
import { TrainingEntity } from './training.entity';
import { TrainingService } from './training.service';

@ApiTags('Trainings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('trainings')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @ApiOperation({
    summary: 'Get the last 30 user trainings or with a specific amount ',
  })
  @ApiQuery({
    name: 'take',
    description: 'To get a certain number of items',
    required: false,
  })
  @ApiQuery({
    name: 'skip',
    description: 'Number of first items missed',
    required: false,
  })
  @ApiResponse({ status: 200, type: [TrainingEntity] })
  @Get()
  async getFistList(
    @GetUserId() userId: number,
    @Query('take') take,
    @Query('skip') skip,
  ): Promise<TrainingEntity[]> {
    console.log(take, skip);
    if (take === undefined) {
      take = 30;
    }
    if (skip === undefined) {
      skip = 0;
    }
    return await this.trainingService.getTrainings(userId, take, skip);
  }

  @ApiOperation({ summary: 'Get user training by page' })
  @ApiParam({ name: 'index', example: 2, description: 'Index list page' })
  @ApiResponse({ status: 200, type: [TrainingEntity] })
  @Get(':index')
  async getListByIndex(
    @Param('index') index: number,
    @GetUserId() userId: number,
  ): Promise<TrainingEntity[]> {
    const take = 30 * index;
    const skip = take - 30;
    return await this.trainingService.getTrainings(userId, take, skip);
  }

  @ApiOperation({ summary: 'Create training for user' })
  @ApiResponse({ status: 200, type: TrainingEntity })
  @UsePipes(new ValidationPipe())
  @Post()
  create(
    @Body() body: ExcerciseDto[],
    @GetUserId() id: number,
  ): Promise<TrainingEntity> {
    return this.trainingService.create(body, id);
  }

  @ApiOperation({ summary: 'Delete user training by id' })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.trainingService.deleteTraining(id);
  }
}
