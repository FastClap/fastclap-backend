import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFormComedianDto {
  @IsString()
  @IsNotEmpty()
  firstname!: string;

  @IsString()
  @IsNotEmpty()
  lastname!: string;

  @IsNumber()
  @IsNotEmpty()
  age!: number;

  @IsString()
  @IsNotEmpty()
  address!: string;
}
