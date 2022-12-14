import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sequence } from './sequence.entity';
import { Tag } from 'apps/tag/tag.entity';
import { CreateSequenceDto } from './dto/create-sequence.dto';
import { UpdateSequenceDto } from './dto/update-sequence.dto';
import { ProjectService } from 'apps/project/project.service';
import { NotFoundException } from 'apps/utils/exceptions/not-found.exception';
import { CategoryService } from 'apps/category/category.service';
import { Category } from "../category/category.entity";

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

  async create(
    projectId: string,
    createSequenceDto: CreateSequenceDto,
  ): Promise<string> {
    const project: boolean = await this.projectService.exist(projectId);
    if (!project) {
      throw NotFoundException('project');
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
        throw NotFoundException('sequence');
      });
  }

  async findOne(projectId: string, sequenceId: string): Promise<Sequence> {
    return this.sequenceRepository
      .findOneByOrFail({ uuid: sequenceId, projectId: projectId })
      .catch((e) => {
        console.error(e);
        throw NotFoundException('sequence');
      });
  }

  // TODO - Clean this method
  async findTags(projectId: string, sequenceId: string) {
    const res = {};

    const sequence: Sequence = await this.sequenceRepository
      .findOneByOrFail({ uuid: sequenceId, projectId: projectId })
      .catch((e) => {
        console.error(e);
        throw NotFoundException('sequence');
      });

    res['sequence'] = { ...sequence };

    const tags: Tag[] = await this.tagRepository
      .findBy({ projectId: projectId, sequenceId: sequenceId })
      .catch((e) => {
        console.error(e);
        throw NotFoundException('project or sequence');
      });

    const categoryIds: string[] = [];

    for (const tag in tags) {
      if (!categoryIds.includes(tags[tag].categoryId)) {
        categoryIds.push(tags[tag].categoryId);
      }
    }

    const categories = [];

    for (const categoryId in categoryIds) {
      const category: Category = await this.categoryService.findOne(
        projectId,
        categoryIds[categoryId],
      );
      categories.push({ ...category, tags: [] });
    }

    for (const category in categories) {
      for (const tag in tags) {
        if (categories[category].uuid === tags[tag].categoryId) {
          categories[category].tags.push(tags[tag]);
        }
      }
    }

    res['categories'] = [...categories];

    return res;
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
        throw NotFoundException('sequence');
      });
    return this.findOne(projectId, sequenceId);
  }

  async delete(projectId: string, sequenceId: string): Promise<string> {
    const result = await this.sequenceRepository
      .delete({ uuid: sequenceId, projectId: projectId })
      .catch((e) => {
        console.error(e);
        throw NotFoundException('sequence');
      });
    return result.affected + ' sequence has been successfully deleted';
  }

  // async deleteByProject(projectId: string) {
  //   const result = await this.sequenceRepository
  //     .delete({ projectId: projectId })
  //     .catch((e) => {
  //       console.error(e);
  //       throw NotFoundException('project');
  //     });
  //   return result.affected + ' sequence have been successfully deleted';
  // }
}
