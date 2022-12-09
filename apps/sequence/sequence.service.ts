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
        error: 'Undefined ' + type,
      },
      HttpStatus.NOT_FOUND,
    );
  }

  getAll(): Promise<Sequence[]> {
    return this.sequencesRepository.find();
  }

  async getAllByProject(id: string): Promise<Sequence[]> {
    const projectExist = await this.projectService.exist(id);
    if (!projectExist) {
      throw this.throwUndefinedElement('project');
    }
    const res = this.sequencesRepository
      .findBy({ projectId: id })
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('sequence');
      });
    return res;
  }

  getOne(id: string): Promise<Sequence> {
    const res = this.sequencesRepository
      .findOneByOrFail({ uuid: id })
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('sequence');
      });
    return res;
  }

  async exist(id: string): Promise<boolean> {
    return this.sequencesRepository.exist({ where: { uuid: id } });
  }

  async create(body: CreateSequenceDto): Promise<string> {
    const projectExist = await this.projectService.exist(body.projectId);
    if (!projectExist) {
      throw this.throwUndefinedElement('project');
    }
    const newSequence = this.sequencesRepository.create(body);
    return (await this.sequencesRepository.save(newSequence)).uuid;
  }

  update(id: string, body: UpdateSequenceDto) {
    this.sequencesRepository.update({ uuid: id }, body).catch((e) => {
      console.error(e);
      throw this.throwUndefinedElement('sequence');
    });
    return body;
  }

  async delete(id: string): Promise<string> {
    const result = await this.sequencesRepository
      .delete({ uuid: id })
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('sequence');
      });
    return result.affected + ' sequences have been succesfully deleted';
  }

  async deleteByProject(id: string) {
    const result = await this.sequencesRepository
      .delete({ projectId: id })
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('project');
      });
    return result.affected + ' sequences have been succesfully deleted';
  }
}
