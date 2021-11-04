import { Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUserId } from 'src/auth/decorators/get-user-id.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ExcerciseDto } from 'src/excercise/dto/excercise.dto';
import { ExcerciseService } from 'src/excercise/excercise.service';
import { TrainingEntity } from './training.entity';
import { TrainingService } from './training.service';

@ApiTags('Trainings')
@UseGuards(JwtAuthGuard)
@Controller('trainings')
export class TrainingController {
    constructor(
        private readonly trainingService: TrainingService,
    ) {}

    @Get()
    async getFistList(@GetUserId() id: number): Promise<TrainingEntity[]> {
        return await this.trainingService.getTrainings(1, id)
    }

    @Get(':index')
    async getListByIndex(@Param('index') index: number, @GetUserId() id: number): Promise<TrainingEntity[]> {
        return await this.trainingService.getTrainings(index, id)
    }

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body('training') body: ExcerciseDto[], @GetUserId() id: number): Promise<TrainingEntity> {
        return this.trainingService.create(body, id)
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.trainingService.deleteTraining(id)
    }


}
