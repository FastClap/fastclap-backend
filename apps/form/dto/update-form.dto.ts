import {IsString, IsNotEmpty, IsOptional} from 'class-validator';

export class UpdateFormDto {
    @IsString()
    @IsNotEmpty()
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
