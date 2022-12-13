import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, UploadedFile, UseInterceptors,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {fileManager, uploadFileFilter} from "./project.utils";

@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  @Post()
  @UseInterceptors(
      FileInterceptor('pdf', {
        storage: diskStorage({
          destination: '/home/node/app/files',
          filename: fileManager.customFileName
        }),
        fileFilter: uploadFileFilter
      })
  )
  async create(@Body() body: CreateProjectDto, @UploadedFile() file: Express.Multer.File): Promise<Project> {
    // TODO - Use types to pass the DTO to the service and get an Entity
    return this.projectService.create(body, file);
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

  // @Post('/:id/script/upload')
  // @UseInterceptors(
  //     FileInterceptor('pdf', {
  //       storage: diskStorage({
  //         destination: '/home/node/app/files',
  //         filename: fileManager.customFileName
  //       }),
  //       fileFilter: uploadFileFilter
  //     })
  // )
  // async uploadMyFile(@UploadedFile() file: any) {
  //
  //   let filepath = path.resolve(process.cwd());
  //   let file_content = await this.projectService.loadFile(path.join(filepath, "files/", file.filename));
  //
  //   return {
  //     content: file_content,
  //   };
  // }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.projectService.delete(id);
  }
}
