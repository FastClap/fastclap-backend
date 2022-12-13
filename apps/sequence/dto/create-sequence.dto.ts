import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSequenceDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;
}
