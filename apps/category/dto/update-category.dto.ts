import { PartialType, PickType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(
  PickType(CreateCategoryDto, ['name', 'description'] as const),
) {}

// TODO - Insert color string DTO
