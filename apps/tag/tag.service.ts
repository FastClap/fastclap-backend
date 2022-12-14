import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { CategoryService } from 'apps/category/category.service';
import { ProjectService } from 'apps/project/project.service';
import { SequenceService } from 'apps/sequence/sequence.service';
// import { NotFoundException } from '@app/exceptions';
import { NotFoundException } from 'apps/utils/exceptions/not-found.exception';
import { BadRequestException } from 'apps/utils/exceptions/bad-request.exception';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
    private readonly projectService: ProjectService,
    private readonly categoryService: CategoryService,
    private readonly sequenceService: SequenceService,
  ) {}

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
      // throw NotFoundException('tag');
      throw this.throwAlreadyExist('tag');
    }
    const project: boolean = await this.projectService.exist(projectId);
    if (!project) {
      throw BadRequestException('id', 'uuid');
      // throw NotFoundException('project');
    }

    const category: boolean = await this.categoryService.exist(
      createTagDto.categoryId,
    );
    if (!category) {
      throw NotFoundException('category');
    }

    const sequence: boolean = await this.sequenceService.exist(
      createTagDto.sequenceId,
    );
    if (!sequence) {
      throw NotFoundException('sequence');
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
        throw NotFoundException('tag');
      });
  }

  async update(projectId: string, tagId: string, updateTagDto: UpdateTagDto) {
    this.tagsRepository
      .update({ uuid: tagId, projectId: projectId }, updateTagDto)
      .catch((e) => {
        console.error(e);
        throw NotFoundException('tag');
      });
    return this.findOne(projectId, tagId);
  }

  async delete(projectId: string, tagId: string) {
    const result = await this.tagsRepository
      .delete({ uuid: tagId, projectId: projectId })
      .catch((e) => {
        console.error(e);
        throw NotFoundException('tag');
      });
    return result.affected + ' tag has been successfully deleted';
  }

  // async deleteByProject(projectId: string) {
  //   const result = await this.tagsRepository
  //     .delete({ projectId: projectId })
  //     .catch((e) => {
  //       console.error(e);
  //       throw NotFoundException('project');
  //     });
  //   return result.affected + ' tag have been successfully deleted';
  // }

  // async deleteByCategory(categoryId: string) {
  //   const result = await this.tagsRepository
  //     .delete({ categoryId: categoryId })
  //     .catch((e) => {
  //       console.error(e);
  //       throw NotFoundException('category');
  //     });
  //   return result.affected + ' tag have been successfully deleted';
  // }
}
