import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sequence } from './sequence.entity';
import { Tag } from 'apps/tag/tag.entity';
import { CreateSequenceDto } from './dto/create-sequence.dto';
import { UpdateSequenceDto } from './dto/update-sequence.dto';
import { ProjectService } from 'apps/project/project.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class SequenceService {
  constructor(
    private moduleRef: ModuleRef,
    @InjectRepository(Sequence)
    private sequenceRepository: Repository<Sequence>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    private readonly projectService: ProjectService,
  ) {}

  throwUndefinedElement(type: string): HttpException {
    return new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: type + 'not found.',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async create(
    projectId: string,
    createSequenceDto: CreateSequenceDto,
  ): Promise<string> {
    const project: boolean = await this.projectService.exist(projectId);
    if (!project) {
      throw this.throwUndefinedElement('project');
    }
    const sequence: Sequence = this.sequenceRepository.create({
      ...createSequenceDto,
      projectId: projectId,
    });
    return (await this.sequenceRepository.save(sequence)).uuid;
  }

  async exist(id: string): Promise<boolean> {
    return this.sequenceRepository.exist({ where: { uuid: id } });
  }

  async findAll(projectId: string): Promise<Sequence[]> {
    return this.sequenceRepository
      .findBy({ projectId: projectId })
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('sequence');
      });
  }

  async findOne(projectId: string, sequenceId: string): Promise<Sequence> {
    return this.sequenceRepository
      .findOneByOrFail({ uuid: sequenceId, projectId: projectId })
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('sequence');
      });
  }

  async findTags(projectId: string, sequenceId: string): Promise<Tag[]> {
    return this.tagRepository
      .findBy({ projectId: projectId, sequenceId: sequenceId })
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('project or sequence');
      });
  }

  async update(
    projectId: string,
    sequenceId: string,
    updateSequenceDto: UpdateSequenceDto,
  ): Promise<Sequence> {
    this.sequenceRepository
      .update({ uuid: sequenceId, projectId: projectId }, updateSequenceDto)
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('sequence');
      });
    return this.findOne(projectId, sequenceId);
  }

  async delete(projectId: string, sequenceId: string): Promise<string> {
    const result = await this.sequenceRepository
      .delete({ uuid: sequenceId, projectId: projectId })
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('sequence');
      });
    return result.affected + ' sequence has been successfully deleted';
  }
}
