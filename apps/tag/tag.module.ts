import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'apps/category/category.module';
import { ProjectModule } from 'apps/project/project.module';
import { TagController } from './tag.controller';
import { Tag } from './tag.entity';
import { TagService } from './tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tag]), CategoryModule, ProjectModule],
  providers: [TagService],
  controllers: [TagController],
})
export class TagModule {}
