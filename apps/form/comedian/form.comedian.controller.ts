import {
    Body,
    Controller,
    Get,
    Post,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { FormComedianService } from './form.comedian.service';
import { CreateFormComedianDto } from './dto/create-form-comedian.dto';
import { UpdateFormComedianDto } from './dto/update-form-comedian.dto';

@Controller('form')
export class FormComedianController {
    constructor(private readonly formComedianService: FormComedianService) {}

    @Get()
    async getAll() {
        return this.formComedianService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id') id: string) {
        return this.formComedianService.getOne(id);
    }

    @Post()
    async create(@Body() createFormDto: CreateFormComedianDto) {
        return this.formComedianService.create(createFormDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateFormDto: UpdateFormComedianDto) {
        return this.formComedianService.update(id, updateFormDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.formComedianService.delete(id);
    }
}
