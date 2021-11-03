import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExcerciseDto } from 'src/excercise/dto/excercise.dto';
import { ExcerciseService } from 'src/excercise/excercise.service';
import { TrainingEntity } from './training.entity';
import { TrainingService } from './training.service';

@ApiTags('Trainings')
@Controller('trainings')
export class TrainingController {
    constructor(
        private readonly trainingService: TrainingService,
    ) {}

    @Get()
    async getFistList(): Promise<TrainingEntity[]> {
        return await this.trainingService.getTrainings(1, 3)
    }

    @Get(':index')
    async getListByIndex(@Param('index') index: number): Promise<TrainingEntity[]> {
        return await this.trainingService.getTrainings(index, 3)
    }

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body('training') body: ExcerciseDto[]): Promise<TrainingEntity> {
        return this.trainingService.create(body, 3)
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.trainingService.deleteTraining(id)
    }


}
