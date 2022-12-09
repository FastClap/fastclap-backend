import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from 'apps/project/project.module';
import { SequenceController } from './sequence.controller';
import { Sequence } from './sequence.entity';
import { SequenceService } from './sequence.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sequence]), ProjectModule],
  providers: [SequenceService],
  controllers: [SequenceController],
  exports: [SequenceService],
})
export class SequenceModule {}
