import { IsNotEmpty, IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    stock: number;

    @IsNotEmpty()
    @IsString()
    category: string;

    @IsString()
    imageUrl: string;

    @IsArray()
    @IsOptional()
    tags?: string[]; 

    @IsNotEmpty()
    @IsString()
    farmer: string; 
}
