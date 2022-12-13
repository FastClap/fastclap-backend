import { PartialType, PickType } from '@nestjs/swagger';
import { CreateTagDto } from './create-tag.dto';

export class UpdateTagDto extends PartialType(
  PickType(CreateTagDto, ['categoryId', 'sequenceId', 'metadata', 'content']),
) {}
