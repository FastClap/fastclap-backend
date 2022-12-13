import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './project.entity';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto): Promise<string> {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Get(':projectId')
  async findOne(@Param('projectId') projectId: string): Promise<Project> {
    return this.projectService.findOne(projectId);
  }

  // TODO - Create UUID DTO
  @Patch(':projectId')
  async update(
    @Param('projectId') projectId: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectService.update(projectId, updateProjectDto);
  }

  @Delete(':projectId')
  async delete(@Param('projectId') projectId: string): Promise<string> {
    return this.projectService.delete(projectId);
  }
}
