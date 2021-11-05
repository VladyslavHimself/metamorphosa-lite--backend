import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExcerciseEntity } from './entities/excercise.entity';
import { MuscleTypeEntity } from './entities/muscleType.entity';
import { ExcerciseController } from './excercise.controller';
import { ExcerciseService } from './excercise.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExcerciseEntity, MuscleTypeEntity])],
  providers: [ExcerciseService],
  controllers: [ExcerciseController],
  exports: [ExcerciseService],
})
export class ExcerciseModule {}
