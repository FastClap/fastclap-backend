import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class CreateSequenceDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  projectId!: string;
}
