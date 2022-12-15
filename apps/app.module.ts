import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProjectModule } from './project/project.module';
import { CategoryModule } from './category/category.module';
import { SequenceModule } from './sequence/sequence.module';
import { TagModule } from './tag/tag.module';

import { CreateProjectSubscriber } from "./project/subscribers/create-project.subscriber";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: +configService.get<number>('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [],
        subscribers: [ CreateProjectSubscriber ],
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    CategoryModule,
    TagModule,
    ProjectModule,
    SequenceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
