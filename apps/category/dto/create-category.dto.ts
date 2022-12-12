import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  // TODO - Insert color string DTO

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  projectId!: string;
}
