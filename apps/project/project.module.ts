import { forwardRef, Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { MulterModule } from '@nestjs/platform-express';
import { CategoryModule } from 'apps/category/category.module';
import { SequenceModule } from 'apps/sequence/sequence.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    MulterModule.register({
      dest: '/home/node/app/files',
    }),
    forwardRef(() => CategoryModule),
    forwardRef(() => SequenceModule),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
