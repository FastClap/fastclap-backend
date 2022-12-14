import { Body, Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { SequenceService } from './sequence.service';
import { CreateSequenceDto } from './dto/create-sequence.dto';
import { UpdateSequenceDto } from './dto/update-sequence.dto';
import { Sequence } from './sequence.entity';
import { IsUuidParam } from 'apps/utils/decorators/Is-uuid-param.decorator';

@Controller('project/:projectId/sequence')
export class SequenceController {
  constructor(private readonly sequenceService: SequenceService) {}

  @Post()
  async create(
    @IsUuidParam('projectId') projectId: string,
    @Body() createSequenceDto: CreateSequenceDto,
  ): Promise<string> {
    return this.sequenceService.create(projectId, createSequenceDto);
  }

  @Get()
  async findAll(
    @IsUuidParam('projectId') projectId: string,
  ): Promise<Sequence[]> {
    return this.sequenceService.findAll(projectId);
  }

  @Get(':sequenceId')
  async findOne(
    @IsUuidParam('projectId') projectId: string,
    @IsUuidParam('sequenceId') sequenceId: string,
  ) {
    return this.sequenceService.findTags(projectId, sequenceId);
  }

  @Patch(':sequenceId')
  async update(
    @IsUuidParam('projectId') projectId: string,
    @IsUuidParam('sequenceId') sequenceId: string,
    @Body() updateSequenceDto: UpdateSequenceDto,
  ): Promise<Sequence> {
    return this.sequenceService.update(
      projectId,
      sequenceId,
      updateSequenceDto,
    );
  }

  @Delete(':sequenceId')
  async delete(
    @IsUuidParam('projectId') projectId: string,
    @IsUuidParam('sequenceId') sequenceId: string,
  ): Promise<string> {
    return this.sequenceService.delete(projectId, sequenceId);
  }
}
