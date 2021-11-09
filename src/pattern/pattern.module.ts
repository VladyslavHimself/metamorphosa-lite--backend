import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatternEntity } from './pattern.entity';
import { PatternController } from './pattern.controller';
import { PatternService } from './pattern.service';

@Module({
  imports: [TypeOrmModule.forFeature([PatternEntity])],
  controllers: [PatternController],
  providers: [PatternService],
})
export class PatternModule {}
