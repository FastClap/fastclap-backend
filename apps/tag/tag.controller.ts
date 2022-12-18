import { Body, Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './tag.entity';
import { IsUuidParam } from 'apps/utils/decorators/Is-uuid-param.decorator';
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Tag')
@Controller('project/:projectId/tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiOperation({ operationId: 'TagCreate' })
  @Post()
  async create(
    @IsUuidParam('projectId') projectId: string,
    @Body() createTagDto: CreateTagDto,
  ): Promise<string> {
    return this.tagService.create(projectId, createTagDto);
  }

  @ApiOperation({ operationId: 'TagFindOne' })
  @Get(':tagId')
  async findOne(
    @IsUuidParam('projectId') projectId: string,
    @IsUuidParam('tagId') tagId: string,
  ): Promise<Tag> {
    return this.tagService.findOne(projectId, tagId);
  }

  @ApiOperation({ operationId: 'TagUpdate' })
  @Patch(':tagId')
  async update(
    @IsUuidParam('projectId') projectId: string,
    @IsUuidParam('tagId') tagId: string,
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<Tag> {
    return this.tagService.update(projectId, tagId, updateTagDto);
  }

  @ApiOperation({ operationId: 'TagDelete' })
  @Delete(':tagId')
  async delete(
    @IsUuidParam('projectId') projectId: string,
    @IsUuidParam('tagId') tagId: string,
  ): Promise<string> {
    return this.tagService.delete(projectId, tagId);
  }
}
