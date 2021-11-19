import { ApiProperty } from '@nestjs/swagger';
import { TrainingEntity } from 'src/training/training.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('excercises')
export class ExcerciseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Leg extension', description: 'Name for Excercise' })
  @Column()
  name: string;

  @ApiProperty({ example: 6, description: 'Sets' })
  @Column({ default: 0 })
  sets: number;

  @ApiProperty({ example: 12, description: 'Reps' })
  @Column()
  reps: number;

  @ApiProperty({ example: 32, description: 'Weight Default 0' })
  @Column({ default: 0 })
  weight: number;

  @ApiProperty({
    example: ['Legs', 'Biceps', 'Back'],
    description: 'Muscle types',
  })
  @Column({ type: 'json', default: [] })
  muscleTypes: [];

  @ManyToOne(() => UserEntity, (user) => user.excercises)
  user: UserEntity;

  @ManyToOne(() => TrainingEntity, (training) => training.excercises)
  training: TrainingEntity;

  @CreateDateColumn()
  isCreate: Date;
}
