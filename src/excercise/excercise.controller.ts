import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/user/auth.guard';
import { User } from 'src/user/user.decorator';
import { ExcerciseDto } from './dto/excercise.dto';
import { ExcerciseEntity } from './entities/excercise.entity';
import { ExcerciseService } from './excercise.service';

@ApiBearerAuth()
@ApiTags('Excercise')
@UseGuards(AuthGuard)
@Controller('excercises')
export class ExcerciseController {
  constructor(private readonly excerciseService: ExcerciseService) {}

  @ApiOperation({ summary: 'Get all excercise by id training' })
  @ApiResponse({ status: 200, type: [ExcerciseEntity] })
  @Get(':id')
  async getTrainingExcercises(
    @Param('id') id: number,
  ): Promise<ExcerciseEntity[]> {
    return await this.excerciseService.getTrainingExcercises(id);
  }

  @ApiOperation({ summary: 'Add excercise to training by id' })
  @ApiResponse({ status: 200, type: ExcerciseEntity })
  @Post(':id')
  @UsePipes(new ValidationPipe())
  async create(
    @Body() body: ExcerciseDto,
    @Param('id') id: number,
    @User('id') userId: number,
  ): Promise<ExcerciseEntity> {
    Object.assign(body, { training: { id }, user: { id: userId } });
    return await this.excerciseService.create(body);
  }

  @ApiOperation({ summary: 'Edit excercise by id' })
  @ApiResponse({ status: 200, type: ExcerciseEntity })
  @Put(':id')
  @UsePipes(new ValidationPipe())
  async editExcercise(
    @Body() body: ExcerciseDto,
    @Param('id') id: number,
  ): Promise<ExcerciseEntity> {
    return await this.excerciseService.editExcercise(body, id);
  }

  @ApiOperation({ summary: 'Delete excercise by id' })
  @ApiResponse({ status: 200, type: ExcerciseEntity })
  @Delete(':id')
  async deleteExcercise(@Param('id') id: number) {
    return await this.excerciseService.delete({ id });
  }
}
