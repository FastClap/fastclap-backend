import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateSequenceDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  projectId!: string;
}
