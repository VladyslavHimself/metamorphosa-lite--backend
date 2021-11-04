import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({example: 7, description: "user Id"})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: "dmytroframe@gmail.com", description: "User email"})
  @Column()
  email!: string;

  @ApiProperty({example: "12345678", description: "user password"})
  @Column()
  password!: string;

  @ApiProperty({example: "2021-11-03T03:02:45.551Z", description: "data registration user"})
  @CreateDateColumn()
  isCreate: Date;

  @OneToMany(() => TrainingEntity, training => training.user)
  trainings: TrainingEntity[]
  
  @OneToMany(() => ExcerciseEntity, excercise => excercise.user)
  excercises: ExcerciseEntity[]


}
