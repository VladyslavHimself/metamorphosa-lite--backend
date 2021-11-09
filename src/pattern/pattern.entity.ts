import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/auth/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('patterns')
export class PatternEntity {
  @ApiProperty({ example: '8', description: 'id pattern' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, select: false })
  topic: string;

  @ApiProperty({
    example: '{"name": "namePattern", "anyParams": 24}',
    description: 'name pattern',
  })
  @Column({ type: 'json' })
  body: {};

  @CreateDateColumn({ select: false })
  createAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.patterns)
  user: UserEntity;
}
