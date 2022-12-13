import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SequenceService } from './sequence.service';
import { CreateSequenceDto } from './dto/create-sequence.dto';
import { UpdateSequenceDto } from './dto/update-sequence.dto';
import { Sequence } from './sequence.entity';
import { Tag } from 'apps/tag/tag.entity';

@Controller('project/:projectId/sequence')
export class SequenceController {
  constructor(private readonly sequenceService: SequenceService) {}

  @Post()
  async create(
    @Param('projectId') projectId: string,
    @Body() createSequenceDto: CreateSequenceDto,
  ): Promise<string> {
    return this.sequenceService.create(projectId, createSequenceDto);
  }

  @Get()
  async findAll(@Param('projectId') projectId: string): Promise<Sequence[]> {
    return this.sequenceService.findAll(projectId);
  }

  @Get(':sequenceId')
  async findOne(
    @Param('projectId') projectId: string,
    @Param('sequenceId') sequenceId: string,
  ): Promise<Sequence> {
    return this.sequenceService.findOne(projectId, sequenceId);
  }

  @Get(':sequenceId/tag')
  async findTags(
    @Param('projectId') projectId: string,
    @Param('sequenceId') sequenceId: string,
  ): Promise<Tag[]> {
    return this.sequenceService.findTags(projectId, sequenceId);
  }

  @Patch(':sequenceId')
  async update(
    @Param('projectId') projectId: string,
    @Param('sequenceId') sequenceId: string,
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
    @Param('projectId') projectId: string,
    @Param('sequenceId') sequenceId: string,
  ): Promise<string> {
    return this.sequenceService.delete(projectId, sequenceId);
  }
}
