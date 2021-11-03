import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExcerciseDto } from './dto/excercise.dto';
import { ExcerciseEntity } from './entities/excercise.entity';
import { ExcerciseService } from './excercise.service';

@ApiTags('Excercise')
@Controller('excercises')
export class ExcerciseController {
    constructor(
        private readonly excerciseService: ExcerciseService
    ) {}
    
        
    @Get(':id')
    async getTrainingExcercises(@Param('id') id: number): Promise<ExcerciseEntity[]> {
        return await this.excerciseService.getTrainingExcercises(id)
    }

    @Post(':id')
    @UsePipes(new ValidationPipe())
    async create(@Body() body: ExcerciseDto, @Param('id') id: number): Promise<ExcerciseEntity> {
        Object.assign(body, {training: {id}})
        return await this.excerciseService.create(body)
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    async editExcercise(@Body() body: ExcerciseDto, @Param('id') id: number): Promise<ExcerciseEntity> {
        return await this.excerciseService.editExcercise(body, id)
    }

    @Delete(':id')
    async deleteExcercise(@Param('id') id: number) {
        return await this.excerciseService.delete({id})
    }

}
