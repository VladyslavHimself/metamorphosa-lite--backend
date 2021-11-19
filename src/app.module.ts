import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExcerciseModule } from './excercise/excercise.module';
import { TrainingModule } from './training/training.module';
import { PatternModule } from './pattern/pattern.module';
import { UserModule } from './user/user.module';
import { UserMiddleware } from './user/user.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot(),
    UserModule,
    TrainingModule,
    ExcerciseModule,
    PatternModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    })
  }
}
