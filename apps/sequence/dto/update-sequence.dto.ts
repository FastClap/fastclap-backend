import { PartialType, PickType } from '@nestjs/swagger';
import { CreateSequenceDto } from './create-sequence.dto';

export class UpdateSequenceDto extends PartialType(
  PickType(CreateSequenceDto, ['name', 'description']),
) {}
