import { Injectable } from '@nestjs/common';
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

  async create(body: CreateProjectDto): Promise<Project> {
    const project: Project = await this.projectRepository.create(body);
    return this.projectRepository.save(project);
  }

  async find(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async findOne(id: string): Promise<Project> {
    return this.projectRepository.findOneBy({ uuid: id });
  }

  async exist(id: string): Promise<boolean> {
    return this.projectRepository.exist({ where: { uuid: id } });
  }

  // TODO - Find a way to make the update projectService function returns a Promise<Project>
  async update(id: string, body: UpdateProjectDto) {
    return this.projectRepository.update({ uuid: id }, body);
  }

  async delete(id: string) {
    return this.projectRepository.delete({ uuid: id });
  }
}
