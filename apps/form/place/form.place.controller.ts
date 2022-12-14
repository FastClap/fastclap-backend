import { Body, Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { FormPlaceService } from './form.place.service';
import { CreateFormPlaceDto } from './dto/create-form-place.dto';
import { UpdateFormPlaceDto } from './dto/update-form-place.dto';
import { IsUuidParam } from 'apps/utils/decorators/Is-uuid-param.decorator';

@Controller('form')
export class FormPlaceController {
  constructor(private readonly formPlaceService: FormPlaceService) {}

  @Get()
  async getAll() {
    return this.formPlaceService.getAll();
  }

  @Get(':id')
  async getOne(@IsUuidParam('id') id: string) {
    return this.formPlaceService.getOne(id);
  }

  @Post()
  async create(@Body() createFormDto: CreateFormPlaceDto) {
    return this.formPlaceService.create(createFormDto);
  }

  @Patch(':id')
  update(
    @IsUuidParam('id') id: string,
    @Body() updateFormDto: UpdateFormPlaceDto,
  ) {
    return this.formPlaceService.update(id, updateFormDto);
  }

  @Delete(':id')
  async delete(@IsUuidParam('id') id: string) {
    return this.formPlaceService.delete(id);
  }
}
