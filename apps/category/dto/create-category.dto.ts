import { IsString, IsNotEmpty, IsHexColor } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsHexColor()
  @IsNotEmpty()
  color!: string;
}
