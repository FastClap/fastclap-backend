import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'apps/category/category.module';
import { ProjectModule } from 'apps/project/project.module';
import { TagController } from './tag.controller';
import { Tag } from './tag.entity';
import { TagService } from './tag.service';
import { SequenceModule } from 'apps/sequence/sequence.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tag]),
    ProjectModule,
    CategoryModule,
    SequenceModule,
  ],
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService],
})
export class TagModule {}
