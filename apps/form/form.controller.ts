import { Body, Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { IsUuidParam } from 'apps/utils/decorators/Is-uuid-param.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Form')
@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Get()
  async getAll() {
    return this.formService.getAll();
  }

  @Get('project/:id')
  async getAllByProject(@IsUuidParam('id') id: string) {
    return this.formService.getAllByProject(id);
  }

  @Get('category/:id')
  async getAllByCategory(@IsUuidParam('id') id: string) {
    return this.formService.getAllByCategory(id);
  }

  @Get(':id')
  async getOne(@IsUuidParam('id') id: string) {
    return this.formService.getOne(id);
  }

  @Post()
  async create(@Body() createFormDto: CreateFormDto) {
    return this.formService.create(createFormDto);
  }

  @Patch(':id')
  update(@IsUuidParam('id') id: string, @Body() updateFormDto: UpdateFormDto) {
    return this.formService.update(id, updateFormDto);
  }

  @Delete(':id')
  async delete(@IsUuidParam('id') id: string) {
    return this.formService.delete(id);
  }

  @Delete('project/:id')
  async deleteByProject(@IsUuidParam('id') id: string) {
    return this.formService.deleteByProject(id);
  }

  @Delete('category/:id')
  async deleteByCategory(@IsUuidParam('id') id: string) {
    return this.formService.deleteByCategory(id);
  }
}
