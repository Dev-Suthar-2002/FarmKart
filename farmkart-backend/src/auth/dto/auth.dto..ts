import { IsEmail,IsString,IsEnum } from "class-validator";
import { Role } from "../role.enum";

export class LoginDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

}

export class ForgotPasswordDto {
    @IsEmail()
    email: string;
}

export class ResetPasswordDto {
    @IsEmail()
    email: string;

    @IsString()
    otp: string;

    @IsString()
    newPassword: string;
}