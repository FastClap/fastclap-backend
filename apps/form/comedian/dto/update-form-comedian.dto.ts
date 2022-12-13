import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateFormComedianDto {
  @IsString()
  @IsOptional()
  firstname?: string;

  @IsString()
  @IsOptional()
  lastname?: string;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsString()
  @IsOptional()
  address?: string;
}
