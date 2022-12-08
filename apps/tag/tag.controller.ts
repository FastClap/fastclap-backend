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

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async getAll() {
    return this.tagService.getAll();
  }

  @Get('project/:id')
  async getAllByProject(@Param('id') id: string) {
    return this.tagService.getAllByProject(id);
  }

  @Get('category/:id')
  async getAllByCategory(@Param('id') id: string) {
    return this.tagService.getAllByCategory(id);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.tagService.getOne(id);
  }

  @Post()
  async create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(id, updateTagDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.tagService.delete(id);
  }

  @Delete('project/:id')
  async deleteByProject(@Param('id') id: string) {
    return this.tagService.deleteByProject(id);
  }

  @Delete('category/:id')
  async deleteByCategory(@Param('id') id: string) {
    return this.tagService.deleteByCategory(id);
  }
}
