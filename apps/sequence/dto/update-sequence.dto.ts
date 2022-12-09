import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateSequenceDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
