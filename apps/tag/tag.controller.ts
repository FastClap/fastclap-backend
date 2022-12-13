import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './tag.entity';

@Controller('project/:projectId/tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async create(
    @Param('projectId') projectId: string,
    @Body() createTagDto: CreateTagDto,
  ): Promise<string> {
    return this.tagService.create(projectId, createTagDto);
  }

  @Get(':tagId')
  async findOne(
    @Param('projectId') projectId: string,
    @Param('tagId') tagId: string,
  ): Promise<Tag> {
    return this.tagService.findOne(projectId, tagId);
  }

  @Patch(':tagId')
  async update(
    @Param('projectId') projectId: string,
    @Param('tagId') tagId: string,
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<Tag> {
    return this.tagService.update(projectId, tagId, updateTagDto);
  }

  @Delete(':tagId')
  async delete(
    @Param('projectId') projectId: string,
    @Param('tagId') tagId: string,
  ): Promise<string> {
    return this.tagService.delete(projectId, tagId);
  }
}
