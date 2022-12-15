import { Injectable } from '@nestjs/common';
import { Project } from './project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import * as path from 'path';
import { loadFile } from './project.utils';
import { NotFoundException } from 'apps/utils/exceptions/not-found.exception';
import { Category } from '../category/category.entity';
import { Sequence } from '../sequence/sequence.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Sequence)
    private readonly sequenceRepository: Repository<Sequence>,
  ) {}

  async create(body: CreateProjectDto): Promise<string> {
    const project: Project = await this.projectRepository.create(body);

    const res = await this.projectRepository.save(project);

    const characterCategory: Category = await this.categoryRepository.create({
      name: 'Personnage',
      projectId: res.uuid,
      color: '#ED3437',
    });
    const characterCategoryRes = await this.categoryRepository.save(
      characterCategory,
    );
    console.log(
      `Category '${characterCategoryRes.name}' (uuid: ${characterCategoryRes.uuid}) created !`,
    );

    const placeCategory: Category = await this.categoryRepository.create({
      name: 'Lieu',
      projectId: res.uuid,
      color: '#2F5DDE',
    });
    const placeCategoryRes = await this.categoryRepository.save(placeCategory);
    console.log(
      `Category '${placeCategoryRes.name}' (uuid: ${placeCategoryRes.uuid}) created !`,
    );

    const sceneryCategory: Category = await this.categoryRepository.create({
      name: 'Décor',
      projectId: res.uuid,
      color: '#2FDE78',
    });
    const sceneryCategoryRes = await this.categoryRepository.save(
      sceneryCategory,
    );
    console.log(
      `Category '${sceneryCategoryRes.name}' (uuid: ${sceneryCategoryRes.uuid}) created !`,
    );

    const firstSequence: Sequence = await this.sequenceRepository.create({
      name: 'Séquence 1',
      projectId: res.uuid,
    });
    const firstSequenceRes = await this.sequenceRepository.save(firstSequence);
    console.log(
      `Sequence '${firstSequenceRes.name}' (uuid: ${firstSequenceRes.uuid}) created !`,
    );

    return res.uuid;
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
    const result = await this.projectRepository
      .delete({ uuid: projectId })
      .catch((e) => {
        console.error(e);
        throw NotFoundException('project');
      });
    return result.affected + ' project has been successfully deleted';
  }
}
