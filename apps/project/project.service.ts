import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Project } from './project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import * as path from 'path';
import { loadFile } from './project.utils';
import { NotFoundException } from 'apps/utils/exceptions/not-found.exception';
import { SequenceService } from 'apps/sequence/sequence.service';
import { CategoryService } from 'apps/category/category.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @Inject(forwardRef(() => SequenceService))
    private readonly sequenceService: SequenceService,
    @Inject(forwardRef(() => CategoryService))
    private readonly categoryService: CategoryService,
  ) {}

  async create(body: CreateProjectDto): Promise<string> {
    const project: Project = await this.projectRepository.create(body);
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

  async updateUpload(
    projectId: string,
    file: Express.Multer.File,
  ): Promise<Project> {
    const file_path = path.resolve(process.cwd());
    const file_content = await loadFile(
      path.join(file_path, 'files/', file.filename),
    );

    this.projectRepository
      .update({ uuid: projectId }, { html: file_content })
      .catch((e) => {
        console.error(e);
        throw NotFoundException('project');
      });
    return this.findOne(projectId);
  }

  async updateMetaData(projectId: string, metadata: string): Promise<string> {
    this.projectRepository
      .update({ uuid: projectId }, { metadata: metadata })
      .catch((e) => {
        console.error(e);
        throw NotFoundException('project');
      });
    return (await this.findOne(projectId)).metadata;
  }

  async delete(projectId: string): Promise<string> {
    console.log("deleting");
    this.categoryService.deleteByProject(projectId);
    this.sequenceService.deleteByProject(projectId);
    const result = await this.projectRepository
      .delete({ uuid: projectId })
      .catch((e) => {
        console.error(e);
        throw NotFoundException('project');
      });
    return result.affected + ' project has been successfully deleted';
  }
}
