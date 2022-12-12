import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsUUID,
} from 'class-validator';

export class CreateFormDto {
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    projectId!: string;

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    categoryId!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsOptional()
    alias?: string;
}
