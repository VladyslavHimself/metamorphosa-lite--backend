import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExcerciseDto } from './dto/excercise.dto';
import { ExcerciseEntity } from './entities/excercise.entity';
// import { MuscleTypeEntity } from './entities/muscleType.entity';

@Injectable()
export class ExcerciseService {
  constructor(
    @InjectRepository(ExcerciseEntity)
    private readonly excerciseRepository: Repository<ExcerciseEntity>, // @InjectRepository(MuscleTypeEntity) // private readonly muscleTypeRepository: Repository<MuscleTypeEntity>,
  ) {}

  async create(body): Promise<ExcerciseEntity> {
    return await this.excerciseRepository.save(body);
  }

  async delete(deleteObj) {
    return await this.excerciseRepository.delete(deleteObj);
  }

  async getTrainingExcercises(id: number): Promise<ExcerciseEntity[]> {
    return await this.excerciseRepository.find({
      where: [{ training: { id: id } }],
      order: { id: 'DESC' },
    });
  }

  async editExcercise(
    body: ExcerciseDto,
    id: number,
  ): Promise<ExcerciseEntity> {
    const excercise = await this.excerciseRepository.findOne({ id });
    Object.assign(excercise, body);
    return await this.excerciseRepository.save(excercise);
  }
}
