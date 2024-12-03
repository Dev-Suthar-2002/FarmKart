import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateCartDto {
    @IsArray()
    @IsNotEmpty({ each: true }) 
    products: {
        productId: string; 
        quantity: number; 
        farmer: string; 
    }[]; 

    @IsNotEmpty()
    customer: string; // Customer ID reference
}
