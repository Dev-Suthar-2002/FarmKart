import { IsEmail, IsString, IsEnum, IsOptional,IsNotEmpty } from 'class-validator';
import { Role } from '../role.enum';

export class RegisterUserDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    name: string;

    @IsEnum(Role)
    role: Role;

    @IsNotEmpty()
    phone: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    bio?: string;
}