import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus, Get, Req, UnauthorizedException, ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/auth.guard';
import { Request } from 'express';
import { MailService } from './mail.service';
import { LoginDto, ResetPasswordDto, ForgotPasswordDto } from './dto/auth.dto.';
import { Role } from './role.enum';
import { RegisterUserDto } from './dto/register-user.dto';


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly mailService: MailService,
    ) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto.email, loginDto.password);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto) {
        if (registerUserDto.role === Role.FARMER) {
            return this.authService.registerFarmer(registerUserDto);
        } else if (registerUserDto.role === Role.CUSTOMER) {
            return this.authService.registerCustomer(registerUserDto);
        } else {
            throw new ConflictException('Invalid role specified');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('protected')
    async getHello(@Req() req: Request) {
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('logout')
    async logout(@Req() req: Request) {
        return this.authService.logout(req.user);
    }

    @HttpCode(HttpStatus.OK)
    @Post('forgotPassword')
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
        const { email } = forgotPasswordDto;
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await this.mailService.sendOtp(email, otp);
        await this.authService.storeOtp(email, otp);
        return { message: 'OTP sent to your email' };
    }

    @Post('verifyOtp')
    async verifyOtp(@Body() body: { email: string; otp: string }) {
        return this.authService.verifyOtp(body.email, body.otp);
    }

    @HttpCode(HttpStatus.OK)
    @Post('resetPassword')
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        const { email, otp, newPassword } = resetPasswordDto;
        await this.authService.verifyOtp(email, otp);
        await this.authService.resetPassword(email, newPassword);
        return { message: 'Password has been reset successfully' };
    }
}