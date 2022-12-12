import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectService } from 'apps/project/project.service';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
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

  getAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  async getAllByProject(id: string): Promise<Category[]> {
    const res = await this.categoriesRepository
      .findBy({ projectId: id })
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('project');
      });
    if (!res) {
      throw this.throwUndefinedElement('project');
    }
    return res;
  }

  getOne(id: string): Promise<Category> {
    const res = this.categoriesRepository
      .findOneByOrFail({ uuid: id })
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('category');
      });
    return res;
  }

  async exist(id: string): Promise<boolean> {
    return this.categoriesRepository.exist({ where: { uuid: id } });
  }

  async create(body: CreateCategoryDto): Promise<string> {
    const projectExist = await this.projectService.exist(body.projectId);
    if (!projectExist) {
      throw this.throwUndefinedElement('project');
    }
    const newCategory = this.categoriesRepository.create(body);
    return (await this.categoriesRepository.save(newCategory)).uuid;
  }

  update(id: string, body: UpdateCategoryDto) {
    this.categoriesRepository.update({ uuid: id }, body).catch((e) => {
      console.error(e);
      throw this.throwUndefinedElement('category');
    });
    return body;
  }

  async delete(id: string): Promise<string> {
    const result = await this.categoriesRepository
      .delete({ uuid: id })
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('category');
      });
    return result.affected + ' Categories have been succesfully deleted';
  }

  async deleteByProject(id: string) {
    const result = await this.categoriesRepository
      .delete({ projectId: id })
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('project');
      });
    return result.affected + ' Categories have been succesfully deleted';
  }
}
