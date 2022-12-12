import {
    IsString,
    IsNotEmpty,
} from 'class-validator';

export class CreateFormPlaceDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    description?: string;

    @IsString()
    @IsNotEmpty()
    address!: string;
}
