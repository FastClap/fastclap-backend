import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from 'apps/project/project.module';
import { SequenceController } from './sequence.controller';
import { Sequence } from './sequence.entity';
import { SequenceService } from './sequence.service';
import { Tag } from 'apps/tag/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sequence, Tag]), ProjectModule],
  controllers: [SequenceController],
  providers: [SequenceService],
  exports: [SequenceService],
})
export class SequenceModule {}
