import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectService } from 'apps/project/project.service';
import { Tag } from 'apps/tag/tag.entity';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { NotFoundException } from 'apps/utils/exceptions/not-found.exception';
import { ConflictException } from 'apps/utils/exceptions/conflict.exception';
import { TagService } from 'apps/tag/tag.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @Inject(forwardRef(() => ProjectService))
    private readonly projectService: ProjectService,
    @Inject(forwardRef(() => TagService))
    private readonly tagService: TagService,
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
    const categories = await this.categoryRepository.findBy({
      uuid: categoryId,
      projectId: projectId,
    });
    console.log(categories.length);
    if (!categories.length) {
      throw NotFoundException('category or project');
    }
    this.tagService.deleteByCategory(categoryId);
    await this.categoryRepository.remove(categories);
    return categories.length + ' categories has been successfully deleted';
  }

  async deleteByProject(projectId: string) {
    const categories = await this.categoryRepository.findBy({
      projectId: projectId,
    });
    console.log(categories.length);
    if (!categories.length) {
      throw NotFoundException('category or project');
    }
    this.tagService.deleteByProject(projectId);
    await this.categoryRepository.remove(categories);
    return categories.length + ' categories has been successfully deleted';
  }
}
