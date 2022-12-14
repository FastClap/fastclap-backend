import { Injectable } from '@nestjs/common';
import { Project } from './project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import * as path from 'path';
import { loadFile } from './project.utils';
import { NotFoundException } from 'apps/utils/exceptions/not-found.exception';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(body: CreateProjectDto, file: Express.Multer.File): Promise<string> {

    let file_path = path.resolve(process.cwd());
    let file_content = await loadFile(path.join(file_path, "files/", file.filename));

    const project: Project = await this.projectRepository.create({
      ...body,
      html: file_content,
    });

    return (await this.projectRepository.save(project)).uuid;
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async findOne(projectId: string): Promise<Project> {
    const res = this.projectRepository
      .findOneByOrFail({ uuid: projectId })
      .catch((e) => {
        console.error(e);
        throw NotFoundException('project');
      });
    if (!res) {
      throw NotFoundException('project');
    }
    return res;
  }

  async exist(projectId: string): Promise<boolean> {
    return this.projectRepository.exist({ where: { uuid: projectId } });
  }

  async update(projectId: string, body: UpdateProjectDto): Promise<Project> {
    this.projectRepository.update({ uuid: projectId }, body).catch((e) => {
      console.error(e);
      throw NotFoundException('project');
    });
    return this.findOne(projectId);
  }

  async delete(projectId: string): Promise<string> {
    const result = await this.projectRepository
      .delete({ uuid: projectId })
      .catch((e) => {
        console.error(e);
        throw NotFoundException('project');
      });
    return result.affected + ' project has been successfully deleted';
  }
}
