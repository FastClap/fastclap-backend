import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateTagDto {
  @IsString()
  @IsNotEmpty()
  categoryId!: string;
}
