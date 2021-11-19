import { ApiProperty } from '@nestjs/swagger';
import { ExcerciseEntity } from 'src/excercise/entities/excercise.entity';
import { PatternEntity } from 'src/pattern/pattern.entity';
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
  @ApiProperty({ example: 7, description: 'user Id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'dmytroframe@gmail.com', description: 'User email' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: '12345678', description: 'user password' })
  @Column()
  password: string;

  @ApiProperty({
    example: 'eyJhbGci6IkpXVCJ9.eyJpZCI6NjE2Mzk4OTMxOTZ9.FQEGC8HI6Vmc',
    description: 'this user refresh token',
  })
  @Column({ default: '' })
  token: string;

  @ApiProperty({
    example: '2021-11-03T03:02:45.551Z',
    description: 'data registration user',
  })
  @CreateDateColumn()
  isCreate: Date;

  @OneToMany(() => TrainingEntity, (training) => training.user)
  trainings: TrainingEntity[];

  @OneToMany(() => ExcerciseEntity, (excercise) => excercise.user)
  excercises: ExcerciseEntity[];

  @OneToMany(() => PatternEntity, (pattern) => pattern.user)
  patterns: PatternEntity[];
}
