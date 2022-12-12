import {IsString, IsOptional} from 'class-validator';

export class UpdateFormPlaceDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    address?: string;
}
