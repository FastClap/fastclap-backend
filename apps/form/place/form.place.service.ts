import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormPlace } from './form.place.entity';
import { CreateFormPlaceDto } from './dto/create-form-place.dto';
import { UpdateFormPlaceDto } from './dto/update-form-place.dto';

@Injectable()
export class FormPlaceService {
  constructor(
    @InjectRepository(FormPlace)
    private formsRepository: Repository<FormPlace>,
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

  getAll(): Promise<FormPlace[]> {
    return this.formsRepository.find();
  }

  async getOne(id: string): Promise<FormPlace> {
    const res = await this.formsRepository
      .findOneByOrFail({ uuid: id })
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('form');
      });
    return res;
  }

  async create(body: CreateFormPlaceDto): Promise<string> {
    const newForm = this.formsRepository.create(body);
    return (await this.formsRepository.save(newForm)).uuid;
  }

  update(id: string, body: UpdateFormPlaceDto) {
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
