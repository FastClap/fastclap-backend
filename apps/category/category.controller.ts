import { Body, Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './category.entity';
import { IsUuidParam } from 'apps/utils/decorators/Is-uuid-param.decorator';
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Category')
@Controller('project/:projectId/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ operationId: 'CategoryCreate' })
  @Post()
  async create(
    @IsUuidParam('projectId') projectId: string,
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<string> {
    return this.categoryService.create(projectId, createCategoryDto);
  }

  @ApiOperation({ operationId: 'CategoryFindAll' })
  @Get()
  async findAll(
    @IsUuidParam('projectId') projectId: string,
  ): Promise<Category[]> {
    return this.categoryService.findAll(projectId);
  }

  @ApiOperation({ operationId: 'CategoryFindOne' })
  @Get(':categoryId')
  async findOne(
    @IsUuidParam('projectId') projectId: string,
    @IsUuidParam('categoryId') categoryId: string,
  ) {
    return this.categoryService.findTags(projectId, categoryId);
  }

  @ApiOperation({ operationId: 'CategoryUpdate' })
  @Patch(':categoryId')
  async update(
    @IsUuidParam('projectId') projectId: string,
    @IsUuidParam('categoryId') categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.update(
      projectId,
      categoryId,
      updateCategoryDto,
    );
  }

  @ApiOperation({ operationId: 'CategoryDelete' })
  @Delete(':categoryId')
  async delete(
    @IsUuidParam('projectId') projectId: string,
    @IsUuidParam('categoryId') categoryId: string,
  ): Promise<string> {
    return this.categoryService.delete(projectId, categoryId);
  }
}
