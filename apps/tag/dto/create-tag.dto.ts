import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  uuid!: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  categoryId!: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  sequenceId!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsString()
  @IsNotEmpty()
  metadata!: string;
}
