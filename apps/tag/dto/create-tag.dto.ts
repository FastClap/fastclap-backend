import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  projectId!: string;

  @IsNumber()
  @IsOptional()
  position?: number = 0;

  @IsNumber()
  @IsOptional()
  length?: number = 3;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  categoryId!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;
}
