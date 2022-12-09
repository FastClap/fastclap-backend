import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SequenceService } from './sequence.service';
import { CreateSequenceDto } from './dto/create-sequence.dto';
import { UpdateSequenceDto } from './dto/update-sequence.dto';

@Controller('sequence')
export class SequenceController {
  constructor(private readonly sequenceService: SequenceService) {}

  @Get()
  async getAll() {
    return this.sequenceService.getAll();
  }

  @Get('project/:id')
  async getAllByProject(@Param('id') id: string) {
    return this.sequenceService.getAllByProject(id);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.sequenceService.getOne(id);
  }

  @Post()
  async create(@Body() createSequenceDto: CreateSequenceDto) {
    return this.sequenceService.create(createSequenceDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSequenceDto: UpdateSequenceDto,
  ) {
    return this.sequenceService.update(id, updateSequenceDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.sequenceService.delete(id);
  }
}
