import {
    Body,
    Controller,
    Get,
    Post,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';

@Controller('form')
export class FormController {
    constructor(private readonly formService: FormService) {}

    @Get()
    async getAll() {
        return this.formService.getAll();
    }

    @Get('project/:id')
    async getAllByProject(@Param('id') id: string) {
        return this.formService.getAllByProject(id);
    }

    @Get('category/:id')
    async getAllByCategory(@Param('id') id: string) {
        return this.formService.getAllByCategory(id);
    }

    @Get(':id')
    async getOne(@Param('id') id: string) {
        return this.formService.getOne(id);
    }

    @Post()
    async create(@Body() createFormDto: CreateFormDto) {
        return this.formService.create(createFormDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto) {
        return this.formService.update(id, updateFormDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.formService.delete(id);
    }

    @Delete('project/:id')
    async deleteByProject(@Param('id') id: string) {
        return this.formService.deleteByProject(id);
    }

    @Delete('category/:id')
    async deleteByCategory(@Param('id') id: string) {
        return this.formService.deleteByCategory(id);
    }
}
