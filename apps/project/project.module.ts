import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { MulterModule } from '@nestjs/platform-express';
import { Category } from 'apps/category/category.entity';
import { Sequence } from 'apps/sequence/sequence.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, Category, Sequence]),
    MulterModule.register({
      dest: '/home/node/app/files',
    }),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
