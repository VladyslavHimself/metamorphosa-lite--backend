import { Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserId } from 'src/auth/decorators/get-user-id.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ExcerciseDto } from 'src/excercise/dto/excercise.dto';
import { ExcerciseService } from 'src/excercise/excercise.service';
import { TrainingEntity } from './training.entity';
import { TrainingService } from './training.service';

@ApiTags('Trainings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('trainings')
export class TrainingController {
    constructor(
        private readonly trainingService: TrainingService,
    ) {}

    @ApiOperation({ summary: 'Get the last 30 trainings the user'})
    @ApiResponse({ status: 200, type: [TrainingEntity] })
    @Get()
    async getFistList(@GetUserId() id: number): Promise<TrainingEntity[]> {
        return await this.trainingService.getTrainings(1, id)
    }

    @ApiOperation({ summary: 'Get user training by page'})
    @ApiResponse({ status: 200, type: [TrainingEntity] })
    @Get(':index')
    async getListByIndex(@Param('index') index: number, @GetUserId() id: number): Promise<TrainingEntity[]> {
        return await this.trainingService.getTrainings(index, id)
    }

    @ApiOperation({ summary: 'Create training for user'})
    @ApiResponse({ status: 200, type: TrainingEntity })
    @UsePipes(new ValidationPipe())
    @Post()
    create(@Body() body: ExcerciseDto[], @GetUserId() id: number): Promise<TrainingEntity> {
        return this.trainingService.create(body, id)
    }

    @ApiOperation({ summary: 'Delete user training by id'})
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.trainingService.deleteTraining(id)
    }


}
