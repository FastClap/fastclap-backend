import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSequenceDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
