import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatternEntity } from './pattern.entity';

@Injectable()
export class PatternService {
  constructor(
    @InjectRepository(PatternEntity)
    private readonly patternRepository: Repository<PatternEntity>,
  ) {}

  async getAllPatterns(
    topic: string,
    userId: number,
  ): Promise<PatternEntity[]> {
    return await this.patternRepository.find({
      where: [{ topic, user: { id: userId } }],
      order: { id: 'DESC' },
    });
  }

  async createPattern(
    topic: string,
    body: {},
    userId: number,
  ): Promise<PatternEntity> {
    const pattern = this.patternRepository.create({
      topic,
      body,
      user: { id: userId },
    });
    return await this.patternRepository.save(pattern);
  }

  async editPattern(
    id: number,
    body: {},
    userId: number,
  ): Promise<PatternEntity> {
    const pattern = await this.patternRepository.findOne({ id });
    Object.assign(pattern.body, body);
    return await this.patternRepository.save(pattern);
  }

  async deleteById(id: number, userId: number) {
    return await this.patternRepository.delete({ id });
  }
}
