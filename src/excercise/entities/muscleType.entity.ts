import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('muscleTypes')
export class MuscleTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
