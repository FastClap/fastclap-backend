import {
  Body,
  Controller,
  Delete,
  Get,
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
import { IsUuidParam } from 'apps/utils/decorators/Is-uuid-param.decorator';

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
    // TODO - Use types to pass the DTO to the service and get an Entity
    return this.projectService.create(body, file);
  }

  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Get(':projectId')
  async findOne(@IsUuidParam('projectId') projectId: string): Promise<Project> {
    return this.projectService.findOne(projectId);
  }

  // TODO - Create UUID DTO
  @Patch(':projectId')
  async update(
    @IsUuidParam('projectId') projectId: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectService.update(projectId, updateProjectDto);
  }

  @Delete(':projectId')
  async delete(@IsUuidParam('projectId') projectId: string): Promise<string> {
    return this.projectService.delete(projectId);
  }
}
