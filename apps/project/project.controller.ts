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
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({ operationId: 'ProjectCreate' })
  @Post()
  async create(@Body() body: CreateProjectDto): Promise<string> {
    return this.projectService.create(body);
  }

  @ApiOperation({ operationId: 'ProjectFindAll' })
  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @ApiOperation({ operationId: 'ProjectFindOne' })
  @Get(':projectId')
  async findOne(@IsUuidParam('projectId') projectId: string): Promise<Project> {
    return this.projectService.findOne(projectId);
  }

  @ApiOperation({ operationId: 'ProjectUpdate' })
  @Patch(':projectId')
  async update(
    @IsUuidParam('projectId') projectId: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectService.update(projectId, updateProjectDto);
  }

  @ApiOperation({ operationId: 'ProjectUploadFile' })
  @Post('/:projectId/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: '/home/node/app/files',
        filename: fileManager.customFileName,
      }),
      fileFilter: uploadFileFilter,
    }),
  )
  async updateUpload(
    @IsUuidParam('projectId') projectId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Project> {
    return this.projectService.updateUpload(projectId, file);
  }

  @ApiOperation({ operationId: 'ProjectDelete' })
  @Delete(':projectId')
  async delete(@IsUuidParam('projectId') projectId: string): Promise<string> {
    return this.projectService.delete(projectId);
  }
}
