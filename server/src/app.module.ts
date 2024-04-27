import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { GoalModule } from './goal/goal.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { SkillModule } from './skill/skill.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          uri: config.get<string>('MONGO_URL'),
        };
      },
    }),
    UserModule,
    TaskModule,
    GoalModule,
    SkillModule,
  ],
})
export class AppModule {}
