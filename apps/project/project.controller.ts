import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './project.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileManager, uploadFileFilter } from './project.utils';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('pdf', {
      storage: diskStorage({
        destination: '/home/node/app/files',
        filename: fileManager.customFileName,
      }),
      fileFilter: uploadFileFilter,
    }),
  )
  async create(
    @Body() body: CreateProjectDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    return this.projectService.create(body, file);
  }

  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Get(':projectId')
  async findOne(@Param('projectId') projectId: string): Promise<Project> {
    return this.projectService.findOne(projectId);
  }

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
