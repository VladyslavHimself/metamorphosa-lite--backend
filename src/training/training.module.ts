import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExcerciseModule } from 'src/excercise/excercise.module';
import { TrainingController } from './training.controller';
import { TrainingEntity } from './training.entity';
import { TrainingService } from './training.service';

@Module({
  imports: [
    ExcerciseModule,
    TypeOrmModule.forFeature([TrainingEntity])
  ],
  controllers: [TrainingController],
  providers: [TrainingService]
})
export class TrainingModule {}
