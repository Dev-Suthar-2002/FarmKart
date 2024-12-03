import { IsEmail, IsNotEmpty, IsString, IsOptional, IsEnum, Matches } from "class-validator";
import { Role } from "src/auth/role.enum";

export class CreateFarmerDto {
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

    @IsOptional()
    @IsString()
    address: string;

    @IsOptional()
    @IsString()
    bio: string;

    @IsOptional()
    @IsEnum(Role)
    role: Role;
}
