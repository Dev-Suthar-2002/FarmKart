import { IsEmail, IsNotEmpty, IsString, IsOptional, Matches,IsEnum } from "class-validator";
import { Role } from "src/auth/role.enum";

export class CreateCustomerDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        { message: "Password must be at least 8 characters long and include at least one letter and one number." }
    )
    password: string;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsOptional()
    @IsEnum(Role)
    role: Role;
}