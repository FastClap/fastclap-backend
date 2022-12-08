import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  throwUndefinedElement(type: string): HttpException {
    return new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'Undefined ' + type,
      },
      HttpStatus.FORBIDDEN,
    );
  }

  getAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  getOne(id: string): Promise<Category> {
    const res = this.categoriesRepository.findOneBy({ uuid: id }).catch((e) => {
      console.error(e);
      throw this.throwUndefinedElement('category');
    });
    if (!res) {
      throw this.throwUndefinedElement('category');
    }
    return res;
  }

  async exist(id: string): Promise<boolean> {
    return this.categoriesRepository.exist({ where: { uuid: id } });
  }

  async create(body: CreateCategoryDto): Promise<string> {
    const newCategory = this.categoriesRepository.create(body);
    return (await this.categoriesRepository.save(newCategory)).uuid;
  }

  update(id: string, body: UpdateCategoryDto) {
    console.log(body);
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
    return result.affected + ' have been succesfully deleted';
  }
}
