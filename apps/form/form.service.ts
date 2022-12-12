import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Form } from './form.entity';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { CategoryService } from 'apps/category/category.service';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form)
    private formsRepository: Repository<Form>,
    private readonly categoriesService: CategoryService,
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

  getAll(): Promise<Form[]> {
    return this.formsRepository.find();
  }

  async getAllByProject(id: string): Promise<Form[]> {
    const res = await this.formsRepository
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

  async getAllByCategory(id: string): Promise<Form[]> {
    const res = await this.formsRepository
      .findBy({ categoryId: id })
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('category');
      });
    if (!res) {
      throw this.throwUndefinedElement('category');
    }
    return res;
  }

  async getOne(id: string): Promise<Form> {
    const res = await this.formsRepository
      .findOneByOrFail({ uuid: id })
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('form');
      });
    return res;
  }

  async create(body: CreateFormDto): Promise<string> {
    const categoryExist = await this.categoriesService.exist(body.categoryId);
    if (!categoryExist) {
      throw this.throwUndefinedElement('category');
    }
    const newForm = this.formsRepository.create(body);
    return (await this.formsRepository.save(newForm)).uuid;
  }

  update(id: string, body: UpdateFormDto) {
    this.formsRepository.update({ uuid: id }, body).catch((e) => {
      console.error(e);
      throw this.throwUndefinedElement('form');
    });
    return body;
  }

  async delete(id: string) {
    const result = await this.formsRepository
      .delete({ uuid: id })
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('form');
      });
    return result.affected + ' Forms have been successfully deleted';
  }

  async deleteByProject(id: string) {
    const result = await this.formsRepository
      .delete({ projectId: id })
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('project');
      });
    return result.affected + ' Forms have been successfully deleted';
  }

  async deleteByCategory(id: string) {
    const result = await this.formsRepository
      .delete({ categoryId: id })
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('category');
      });
    return result.affected + ' Forms have been successfully deleted';
  }
}
