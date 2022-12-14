import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sequence } from './sequence.entity';
import { Tag } from 'apps/tag/tag.entity';
import { CreateSequenceDto } from './dto/create-sequence.dto';
import { UpdateSequenceDto } from './dto/update-sequence.dto';
import { ProjectService } from 'apps/project/project.service';
import { Category } from 'apps/category/category.entity';
import { CategoryService } from 'apps/category/category.service';

@Injectable()
export class SequenceService {
  constructor(
    @InjectRepository(Sequence)
    private sequenceRepository: Repository<Sequence>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    private readonly projectService: ProjectService,
    private readonly categoryService: CategoryService,
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

  // TODO - Clean this method
  async findTags(projectId: string, sequenceId: string) {
    const sequence: Sequence = await this.sequenceRepository
      .findOneByOrFail({ uuid: sequenceId, projectId: projectId })
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('sequence');
      });

    const tags: Tag[] = await this.tagRepository
      .findBy({ projectId: projectId, sequenceId: sequenceId })
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('project or sequence');
      });

    const categoryIds: string[] = [];

    for (const tag in tags) {
      if (!categoryIds.includes(tags[tag].categoryId)) {
        categoryIds.push(tags[tag].categoryId);
      }
    }

    const categories = [];

    for (const categoryId in categoryIds) {
      categories[categoryIds[categoryId]] = (
        await this.categoryService.findOne(projectId, categoryIds[categoryId])
      ).name;
    }

    const res = {
      categories: {},
    };

    let tmp = [];
    for (const categoryId in categoryIds) {
      tmp = [];
      for (const tag in tags) {
        if (categoryIds[categoryId] === tags[tag].categoryId) {
          tmp.push(tags[tag]);
        }
      }
      res.categories[categories[categoryIds[categoryId]]] = tmp;
    }

    return {
      sequence: {
        ...sequence,
      },
      ...res,
    };
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

  // async deleteByProject(projectId: string) {
  //   const result = await this.sequenceRepository
  //     .delete({ projectId: projectId })
  //     .catch((e) => {
  //       console.error(e);
  //       throw this.throwUndefinedElement('project');
  //     });
  //   return result.affected + ' sequence have been successfully deleted';
  // }
}
