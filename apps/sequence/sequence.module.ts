import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from 'apps/project/project.module';
import { SequenceController } from './sequence.controller';
import { Sequence } from './sequence.entity';
import { SequenceService } from './sequence.service';
import { Tag } from 'apps/tag/tag.entity';
import { CategoryModule } from 'apps/category/category.module';
import { TagModule } from 'apps/tag/tag.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sequence, Tag]),
    forwardRef(() => CategoryModule),
    forwardRef(() => ProjectModule),
    forwardRef(() => TagModule),
  ],
  controllers: [SequenceController],
  providers: [SequenceService],
  exports: [SequenceService],
})
export class SequenceModule {}
