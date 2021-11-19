import { ApiProperty } from '@nestjs/swagger';
import { ExcerciseEntity } from 'src/excercise/entities/excercise.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('trainings')
export class TrainingEntity {
  @ApiProperty({ example: '42', description: 'id training' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '2021-11-03T03:02:45.551Z',
    description: 'date create',
  })
  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => UserEntity, (user) => user.trainings)
  user: UserEntity;

  @OneToMany(() => ExcerciseEntity, (excercise) => excercise.training)
  excercises: ExcerciseEntity[];
}
