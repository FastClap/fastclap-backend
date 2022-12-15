import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormPlace } from './form.place.entity';
import { CreateFormPlaceDto } from './dto/create-form-place.dto';
import { UpdateFormPlaceDto } from './dto/update-form-place.dto';
import { NotFoundException } from 'apps/utils/exceptions/not-found.exception';

@Injectable()
export class FormPlaceService {
  constructor(
    @InjectRepository(FormPlace)
    private formsRepository: Repository<FormPlace>,
  ) {}

  getAll(): Promise<FormPlace[]> {
    return this.formsRepository.find();
  }

  async getOne(id: string): Promise<FormPlace> {
    const res = await this.formsRepository
      .findOneByOrFail({ uuid: id })
      .catch((e) => {
        console.error(e);
        throw NotFoundException('form');
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
}
