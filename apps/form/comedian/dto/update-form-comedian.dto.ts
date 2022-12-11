import {IsString, IsNotEmpty, IsNumber} from 'class-validator';

export class UpdateFormComedianDto {
    @IsString()
    @IsNotEmpty()
    firstname!: string;

    @IsString()
    @IsNotEmpty()
    lastname!: string;

    @IsNumber()
    @IsNotEmpty()
    age!: number;

    @IsString()
    @IsNotEmpty()
    address!: string;
}
