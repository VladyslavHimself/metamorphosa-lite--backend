import { ExcerciseEntity } from 'src/excercise/entities/excercise.entity';
import { TrainingEntity } from 'src/training/training.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @CreateDateColumn()
  isCreate: Date;

  @OneToMany(() => TrainingEntity, training => training.user)
  trainings: TrainingEntity[]

  
  @OneToMany(() => ExcerciseEntity, excercise => excercise.user)
  excercises: ExcerciseEntity[]


}
