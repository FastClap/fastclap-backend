import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sequence } from './sequence.entity';
import { CreateSequenceDto } from './dto/create-sequence.dto';
import { UpdateSequenceDto } from './dto/update-sequence.dto';
import { ProjectService } from 'apps/project/project.service';

@Injectable()
export class SequenceService {
  constructor(
    @InjectRepository(Sequence)
    private sequencesRepository: Repository<Sequence>,
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

  async create(projectId: string, body: CreateSequenceDto): Promise<string> {
    const project = await this.projectService.exist(body.projectId);
    if (!project) {
      throw this.throwUndefinedElement('project');
    }
    const sequence: Sequence = this.sequencesRepository.create({
      ...body,
      projectId: projectId,
    });
    return (await this.sequencesRepository.save(sequence)).uuid;
  }

  async findAll(projectId: string): Promise<Sequence[]> {
    return this.sequencesRepository
      .findBy({ projectId: projectId })
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('sequence');
      });
  }

  async findOne(projectId: string, sequenceId: string): Promise<Sequence> {
    return this.sequencesRepository
      .findOneByOrFail({ uuid: sequenceId, projectId: projectId })
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('sequence');
      });
  }

  async update(
    projectId: string,
    sequenceId: string,
    body: UpdateSequenceDto,
  ): Promise<Sequence> {
    this.sequencesRepository
      .update({ uuid: sequenceId, projectId: projectId }, body)
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('sequence');
      });
    return this.findOne(projectId, sequenceId);
  }

  async delete(projectId: string, sequenceId: string): Promise<string> {
    const result = await this.sequencesRepository
      .delete({ uuid: sequenceId, projectId: projectId })
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('sequence');
      });
    return result.affected + ' sequence has been successfully deleted';
  }
}
