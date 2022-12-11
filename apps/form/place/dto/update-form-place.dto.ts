import {IsString, IsNotEmpty} from 'class-validator';

export class UpdateFormPlaceDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsNotEmpty()
    address!: string;
}
