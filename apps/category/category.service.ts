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

  getAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  getOne(id: string): Promise<Category> {
    const res = this.categoriesRepository.findOneBy({ uuid: id }).catch((e) => {
      console.error(e);
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Undefined category',
        },
        HttpStatus.FORBIDDEN,
      );
    });
    return res;
  }

  create(body: CreateCategoryDto): string {
    const newCategory = this.categoriesRepository.create(body);
    this.categoriesRepository.save(newCategory);
    return newCategory.uuid;
  }

  update(id: string, body: UpdateCategoryDto) {
    console.log(body);
    this.categoriesRepository.update({ uuid: id }, body).catch((e) => {
      console.error(e);
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Undefined category',
        },
        HttpStatus.FORBIDDEN,
      );
    });
    return body;
  }

  delete(id: string): string {
    this.categoriesRepository.delete({ uuid: id }).catch((e) => {
      console.error(e);
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Undefined category',
        },
        HttpStatus.FORBIDDEN,
      );
    });
    return 'Category successfuly deleted';
  }
}
