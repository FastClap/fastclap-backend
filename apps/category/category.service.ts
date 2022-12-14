import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectService } from 'apps/project/project.service';
import { Tag } from 'apps/tag/tag.entity';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { NotFoundException } from 'apps/utils/exceptions/not-found.exception';
import { ConflictException } from 'apps/utils/exceptions/conflict.exception';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    private readonly projectService: ProjectService,
  ) {}

  async create(
    projectId: string,
    createCategoryDto: CreateCategoryDto,
  ): Promise<string> {
    const project: boolean = await this.projectService.exist(projectId);
    if (!project) {
      throw NotFoundException('project');
    }

    const exist: Category = await this.categoryRepository.findOneBy({
      name: createCategoryDto.name,
      projectId: projectId,
    });

    if (exist) {
      throw ConflictException('category name');
    }

    const category: Category = this.categoryRepository.create({
      ...createCategoryDto,
      projectId: projectId,
    });
    return (await this.categoryRepository.save(category)).uuid;
  }

  async exist(id: string): Promise<boolean> {
    return this.categoryRepository.exist({ where: { uuid: id } });
  }

  async findAll(projectId: string): Promise<Category[]> {
    return this.categoryRepository
      .findBy({ projectId: projectId })
      .catch((e) => {
        console.error(e);
        throw NotFoundException('category');
      });
  }

  async findOne(projectId: string, categoryId: string): Promise<Category> {
    return this.categoryRepository
      .findOneByOrFail({ uuid: categoryId, projectId: projectId })
      .catch((e) => {
        console.error(e);
        throw NotFoundException('category');
      });
  }

  async findTags(projectId: string, categoryId: string) {
    const category: Category = await this.categoryRepository
      .findOneByOrFail({ uuid: categoryId, projectId: projectId })
      .catch((e) => {
        console.error(e);
        throw NotFoundException('sequence');
      });

    const tag: Tag[] = await this.tagRepository
      .findBy({ projectId: projectId, categoryId: categoryId })
      .catch((e) => {
        console.error(e);
        throw NotFoundException('project or sequence');
      });

    return {
      sequence: {
        ...category,
      },
      tags: [...tag],
    };
  }

  async update(
    projectId: string,
    categoryId: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    this.categoryRepository
      .update({ uuid: categoryId, projectId: projectId }, updateCategoryDto)
      .catch((e) => {
        console.error(e);
        throw NotFoundException('category');
      });
    return this.findOne(projectId, categoryId);
  }

  async delete(projectId: string, categoryId: string): Promise<string> {
    const result = await this.categoryRepository
      .delete({ uuid: categoryId, projectId: projectId })
      .catch((e) => {
        console.error(e);
        throw NotFoundException('category');
      });
    return result.affected + ' category has been successfully deleted';
  }

  async deleteByProject(projectId: string) {
    const result = await this.categoryRepository
      .delete({ projectId: projectId })
      .catch((e) => {
        console.error(e);
        throw NotFoundException('project');
      });
    return result.affected + ' category have been successfully deleted';
  }
}
