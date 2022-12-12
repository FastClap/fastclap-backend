import {
    Body,
    Controller,
    Get,
    Post,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { FormPlaceService } from './form.place.service';
import { CreateFormPlaceDto } from './dto/create-form-place.dto';
import { UpdateFormPlaceDto } from './dto/update-form-place.dto';

@Controller('form')
export class FormPlaceController {
    constructor(private readonly formPlaceService: FormPlaceService) {}

    @Get()
    async getAll() {
        return this.formPlaceService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id') id: string) {
        return this.formPlaceService.getOne(id);
    }

    @Post()
    async create(@Body() createFormDto: CreateFormPlaceDto) {
        return this.formPlaceService.create(createFormDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateFormDto: UpdateFormPlaceDto) {
        return this.formPlaceService.update(id, updateFormDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.formPlaceService.delete(id);
    }
}
