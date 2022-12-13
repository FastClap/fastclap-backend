import { IsString, IsNotEmpty, IsOptional, IsHexColor } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsHexColor()
  @IsNotEmpty()
  color!: string;
}
