import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormComedian } from './form.comedian.entity';
import { CreateFormComedianDto } from './dto/create-form-comedian.dto';
import { UpdateFormComedianDto } from './dto/update-form-comedian.dto';

@Injectable()
export class FormComedianService {
  constructor(
    @InjectRepository(FormComedian)
    private formsRepository: Repository<FormComedian>,
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

  getAll(): Promise<FormComedian[]> {
    return this.formsRepository.find();
  }

  async getOne(id: string): Promise<FormComedian> {
    const res = await this.formsRepository
      .findOneByOrFail({ uuid: id })
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('form');
      });
    return res;
  }

  async create(body: CreateFormComedianDto): Promise<string> {
    const newForm = this.formsRepository.create(body);
    return (await this.formsRepository.save(newForm)).uuid;
  }

  update(id: string, body: UpdateFormComedianDto) {
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
}
