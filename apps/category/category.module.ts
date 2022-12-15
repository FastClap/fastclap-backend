import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from 'apps/project/project.module';
import { CategoryController } from './category.controller';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { Tag } from 'apps/tag/tag.entity';
import { TagModule } from 'apps/tag/tag.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Tag]),
    forwardRef(() => ProjectModule),
    forwardRef(() => TagModule),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
