import { IsString, IsNotEmpty } from 'class-validator';

export class DeleteTagDto {
  @IsString()
  @IsNotEmpty()
  metadata!: string;
}
