import { Body, Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { FormComedianService } from './form.comedian.service';
import { CreateFormComedianDto } from './dto/create-form-comedian.dto';
import { UpdateFormComedianDto } from './dto/update-form-comedian.dto';
import { IsUuidParam } from 'apps/utils/decorators/Is-uuid-param.decorator';

@Controller('form')
export class FormComedianController {
  constructor(private readonly formComedianService: FormComedianService) {}

  @Get()
  async getAll() {
    return this.formComedianService.getAll();
  }

  @Get(':id')
  async getOne(@IsUuidParam('id') id: string) {
    return this.formComedianService.getOne(id);
  }

  @Post()
  async create(@Body() createFormDto: CreateFormComedianDto) {
    return this.formComedianService.create(createFormDto);
  }

  @Patch(':id')
  update(
    @IsUuidParam('id') id: string,
    @Body() updateFormDto: UpdateFormComedianDto,
  ) {
    return this.formComedianService.update(id, updateFormDto);
  }

  @Delete(':id')
  async delete(@IsUuidParam('id') id: string) {
    return this.formComedianService.delete(id);
  }
}
