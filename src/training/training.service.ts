import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExcerciseService } from 'src/excercise/excercise.service';
import { Repository } from 'typeorm';
import { TrainingEntity } from './training.entity';

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(TrainingEntity)
    private readonly trainingRepository: Repository<TrainingEntity>,
    private readonly excerciseService: ExcerciseService,
  ) {}

  async create(excercises, userId: number): Promise<TrainingEntity> {
    // if (await this.isRegistrationTrainingCreatedToday(userId)) {
    //   throw new HttpException('Нельзя Завтра приходи)', HttpStatus.UNPROCESSABLE_ENTITY);
    // }
    const training = await this.trainingRepository.save({
      user: { id: userId },
    });
    if (excercises.excercises.length) {
      excercises.excercises.map(
        async (excercise) =>
          await this.excerciseService.create(
            Object.assign(excercise, { user: { id: userId }, training }),
          ),
      );
    }
    return training;
  }

  async deleteTraining(id: number) {
    await this.excerciseService.delete({ training: { id } });
    return await this.trainingRepository.delete(id);
  }

  async getTrainings(
    userId: number,
    take: number,
    skip: number,
  ): Promise<TrainingEntity[]> {
    return await this.trainingRepository.find({
      where: [{ user: { id: userId } }],
      order: { id: 'DESC' },
      take,
      skip,
    });
  }

  async isRegistrationTrainingCreatedToday(userId: number): Promise<boolean> {
    const training = await this.trainingRepository.findOne({
      where: [{ user: { id: userId } }],
      order: { id: 'DESC' },
    });
    if (training === undefined) {
      return false;
    }
    if (new Date(training.date).getDay() === new Date().getDay()) {
      return true;
    } else {
      return false;
    }
  }
}
