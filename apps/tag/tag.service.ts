import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { CategoryService } from 'apps/category/category.service';
import { ProjectService } from 'apps/project/project.service';
import { SequenceService } from 'apps/sequence/sequence.service';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
    private readonly projectService: ProjectService,
    private readonly categoryService: CategoryService,
    private readonly sequenceService: SequenceService,
  ) {}

  throwUndefinedElement(type: string): HttpException {
    return new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: type + ' not found.',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  throwAlreadyExist(type: string): HttpException {
    return new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: type + ' already exist.',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  async create(projectId: string, createTagDto: CreateTagDto): Promise<string> {
    const tagId: boolean = await this.exist(createTagDto.uuid);
    if (tagId) {
      throw this.throwAlreadyExist('tag');
    }
    const project: boolean = await this.projectService.exist(projectId);
    if (!project) {
      throw this.throwUndefinedElement('project');
    }

    const category: boolean = await this.categoryService.exist(
      createTagDto.categoryId,
    );
    if (!category) {
      throw this.throwUndefinedElement('category');
    }

    const sequence: boolean = await this.sequenceService.exist(
      createTagDto.sequenceId,
    );
    if (!sequence) {
      throw this.throwUndefinedElement('sequence');
    }

    const tag: Tag = this.tagsRepository.create({
      ...createTagDto,
      projectId: projectId,
    });
    return (await this.tagsRepository.save(tag)).uuid;
  }

  async exist(id: string): Promise<boolean> {
    return this.tagsRepository.exist({ where: { uuid: id } });
  }

  async findOne(projectId: string, tagId: string): Promise<Tag> {
    return await this.tagsRepository
      .findOneByOrFail({ uuid: tagId, projectId: projectId })
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('tag');
      });
  }

  async update(projectId: string, tagId: string, updateTagDto: UpdateTagDto) {
    this.tagsRepository
      .update({ uuid: tagId, projectId: projectId }, updateTagDto)
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('tag');
      });
    return this.findOne(projectId, tagId);
  }

  async delete(projectId: string, tagId: string) {
    const result = await this.tagsRepository
      .delete({ uuid: tagId, projectId: projectId })
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('tag');
      });
    return result.affected + ' tag has been successfully deleted';
  }

  // async deleteByProject(projectId: string) {
  //   const result = await this.tagsRepository
  //     .delete({ projectId: projectId })
  //     .catch((e) => {
  //       console.error(e);
  //       throw this.throwUndefinedElement('project');
  //     });
  //   return result.affected + ' tag have been successfully deleted';
  // }

  // async deleteByCategory(categoryId: string) {
  //   const result = await this.tagsRepository
  //     .delete({ categoryId: categoryId })
  //     .catch((e) => {
  //       console.error(e);
  //       throw this.throwUndefinedElement('category');
  //     });
  //   return result.affected + ' tag have been successfully deleted';
  // }
}
