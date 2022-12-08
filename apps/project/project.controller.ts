import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  @Post()
  async create(@Body() body: CreateProjectDto): Promise<Project> {
    // TODO - Use types to pass the DTO to the service and get an Entity
    return this.projectService.create(body);
  }

  @Get()
  async find(): Promise<Project[]> {
    return this.projectService.find();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Project | null> {
    return this.projectService.findOne(id);
  }

  // TODO - Create UUID DTO
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateProjectDto) {
    return this.projectService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.projectService.delete(id);
  }
}
