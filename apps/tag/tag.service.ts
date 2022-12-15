import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { CategoryService } from 'apps/category/category.service';
import { ProjectService } from 'apps/project/project.service';
import { SequenceService } from 'apps/sequence/sequence.service';
import { NotFoundException } from 'apps/utils/exceptions/not-found.exception';
import { BadRequestException } from 'apps/utils/exceptions/bad-request.exception';
import { ConflictException } from 'apps/utils/exceptions/conflict.exception';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
    @Inject(forwardRef(() => ProjectService))
    private readonly projectService: ProjectService,
    @Inject(forwardRef(() => CategoryService))
    private readonly categoryService: CategoryService,
    @Inject(forwardRef(() => SequenceService))
    private readonly sequenceService: SequenceService,
  ) {}

  async create(projectId: string, createTagDto: CreateTagDto): Promise<string> {
    const tagId: boolean = await this.exist(createTagDto.uuid);
    if (tagId) {
      throw ConflictException('tag');
    }
    const project: boolean = await this.projectService.exist(projectId);
    if (!project) {
      throw BadRequestException('id', 'uuid');
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

    this.projectService.updateMetaData(projectId, createTagDto.metadata);

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

  async deleteByCategory(categoryId: string) {
    const sequences = await this.tagsRepository.findBy({
      categoryId: categoryId,
    });
    if (!sequences.length) {
      throw NotFoundException('category');
    }
    await this.tagsRepository.remove(sequences);
    return sequences.length + ' tags have been successfully deleted';
  }

  async deleteBySequence(sequenceId: string) {
    const sequences = await this.tagsRepository.findBy({
      sequenceId: sequenceId,
    });
    if (!sequences.length) {
      throw NotFoundException('sequence');
    }
    await this.tagsRepository.remove(sequences);
    return sequences.length + ' tags have been successfully deleted';
  }

  async deleteByProject(projectId: string) {
    const sequences = await this.tagsRepository.findBy({
      projectId: projectId,
    });
    if (!sequences.length) {
      throw NotFoundException('sequence');
    }
    await this.tagsRepository.remove(sequences);
    return sequences.length + ' tags have been successfully deleted';
  }
}
