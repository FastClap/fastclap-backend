import {IsString, IsOptional} from 'class-validator';

export class UpdateFormDto {
    @IsString()
    @IsOptional()
    categoryId?: string;

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    alias?: string;
}
