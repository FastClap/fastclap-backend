import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { CategoryService } from 'apps/category/category.service';
import { ProjectService } from 'apps/project/project.service';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
    private readonly categoriesService: CategoryService,
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

  getAll(): Promise<Tag[]> {
    return this.tagsRepository.find();
  }

  async getAllByProject(id: string): Promise<Tag[]> {
    const res = await this.tagsRepository
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

  async getAllByCategory(id: string): Promise<Tag[]> {
    const res = await this.tagsRepository
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

  async getOne(id: string): Promise<Tag> {
    const res = await this.tagsRepository
      .findOneByOrFail({ uuid: id })
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('tag');
      });
    return res;
  }

  async create(body: CreateTagDto): Promise<string> {
    const categoryExist = await this.categoriesService.exist(body.categoryId);
    if (!categoryExist) {
      throw this.throwUndefinedElement('category');
    }
    const projectExist = await this.projectService.exist(body.projectId);
    if (!projectExist) {
      throw this.throwUndefinedElement('project');
    }
    const newTag = this.tagsRepository.create(body);
    return (await this.tagsRepository.save(newTag)).uuid;
  }

  update(id: string, body: UpdateTagDto) {
    this.tagsRepository.update({ uuid: id }, body).catch((e) => {
      console.error(e);
      throw this.throwUndefinedElement('tag');
    });
    return body;
  }

  async delete(id: string) {
    const result = await this.tagsRepository.delete({ uuid: id }).catch((e) => {
      console.error(e);
      throw this.throwUndefinedElement('tag');
    });
    return result.affected + ' Tags have been succesfully deleted';
  }

  async deleteByProject(id: string) {
    const result = await this.tagsRepository
      .delete({ projectId: id })
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('project');
      });
    return result.affected + ' Tags have been successfully deleted';
  }

  async deleteByCategory(id: string) {
    const result = await this.tagsRepository
      .delete({ categoryId: id })
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('category');
      });
    return result.affected + ' Tags have been succesfully deleted';
  }
}
