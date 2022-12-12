import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Project } from './project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
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

  async create(body: CreateProjectDto): Promise<Project> {
    const project: Project = await this.projectRepository.create(body);
    return this.projectRepository.save(project);
  }

  async find(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async findOne(id: string): Promise<Project> {
    const res = this.projectRepository
      .findOneByOrFail({ uuid: id })
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('project');
      });
    if (!res) {
      throw this.throwUndefinedElement('project');
    }
    return res;
  }

  async exist(id: string): Promise<boolean> {
    return this.projectRepository.exist({ where: { uuid: id } });
  }

  // TODO - Find a way to make the update projectService function returns a Promise<Project>
  async update(id: string, body: UpdateProjectDto) {
    this.projectRepository.update({ uuid: id }, body)
    .catch((e) => {
      console.error(e);
      throw this.throwUndefinedElement('project');
    });
    // TODO - This is wrong because it returns the unmodified body
    return body;
  }

  async delete(id: string) {
    const result = await this.projectRepository
      .delete({ uuid: id })
      .catch((e) => {
        console.error(e);
        throw this.throwUndefinedElement('project');
      });
    return result.affected + ' Projects have been successfully deleted';
  }
}
