import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateSequenceDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID(undefined, { always: true })
  projectId!: string;
}
