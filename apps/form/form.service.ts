import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Form } from './form.entity';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { CategoryService } from 'apps/category/category.service';
import { NotFoundException } from 'apps/utils/exceptions/not-found.exception';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form)
    private formsRepository: Repository<Form>,
    private readonly categoriesService: CategoryService,
  ) {}

  getAll(): Promise<Form[]> {
    return this.formsRepository.find();
  }

  async getAllByProject(id: string): Promise<Form[]> {
    const res = await this.formsRepository
      .findBy({ projectId: id })
      .catch((e) => {
        console.error(e);
        throw NotFoundException('project');
      });
    if (!res) {
      throw NotFoundException('project');
    }
    return res;
  }

  async getAllByCategory(id: string): Promise<Form[]> {
    const res = await this.formsRepository
      .findBy({ categoryId: id })
      .catch((e) => {
        console.error(e);
        throw NotFoundException('category');
      });
    if (!res) {
      throw NotFoundException('category');
    }
    return res;
  }

  async getOne(id: string): Promise<Form> {
    const res = await this.formsRepository
      .findOneByOrFail({ uuid: id })
      .catch((e) => {
        console.error(e);
        throw NotFoundException('form');
      });
    return res;
  }

  async create(body: CreateFormDto): Promise<string> {
    const categoryExist = await this.categoriesService.exist(body.categoryId);
    if (!categoryExist) {
      throw NotFoundException('category');
    }
    const newForm = this.formsRepository.create(body);
    return (await this.formsRepository.save(newForm)).uuid;
  }

  update(id: string, body: UpdateFormDto) {
    this.formsRepository.update({ uuid: id }, body).catch((e) => {
      console.error(e);
      throw NotFoundException('form');
    });
    return body;
  }

  async delete(id: string) {
    const result = await this.formsRepository
      .delete({ uuid: id })
      .catch((e) => {
        console.error(e);
        throw NotFoundException('form');
      });
    return result.affected + ' Forms have been successfully deleted';
  }

  async deleteByProject(id: string) {
    const result = await this.formsRepository
      .delete({ projectId: id })
      .catch((e) => {
        console.error(e);
        throw NotFoundException('project');
      });
    return result.affected + ' Forms have been successfully deleted';
  }

  async deleteByCategory(id: string) {
    const result = await this.formsRepository
      .delete({ categoryId: id })
      .catch((e) => {
        console.error(e);
        throw NotFoundException('category');
      });
    return result.affected + ' Forms have been successfully deleted';
  }
}
