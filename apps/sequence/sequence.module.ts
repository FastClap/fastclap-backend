import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from 'apps/project/project.module';
import { SequenceController } from './sequence.controller';
import { Sequence } from './sequence.entity';
import { SequenceService } from './sequence.service';
import { Tag } from 'apps/tag/tag.entity';
import { CategoryModule } from 'apps/category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sequence, Tag]),
    ProjectModule,
    CategoryModule,
  ],
  controllers: [SequenceController],
  providers: [SequenceService],
  exports: [SequenceService],
})
export class SequenceModule {}
