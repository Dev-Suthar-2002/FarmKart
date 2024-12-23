import { Injectable, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Farmer } from '../farmer/farmer.schema';
import { Customer } from 'src/customer/customer.schema';
import * as bcrypt from 'bcrypt';
import { Role } from './role.enum';
import { RegisterUserDto } from './dto/register-user.dto';
import { FarmerService } from '../farmer/farmer.service';
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class AuthService {
    private readonly tokenBlacklist: Set<string> = new Set();
    private otpStore: { [key: string]: { otp: string; expires: number } } = {};

    constructor(
        private readonly farmerService: FarmerService,
        private readonly customerService: CustomerService,
        private readonly jwtService: JwtService,
    ) {}

    private async validateUser(email: string, password: string): Promise<Farmer | Customer> {
        let user:any = await this.farmerService.findOneUserByEmail(email);
        if (!user) {
            user = await this.customerService.findOneUserByEmail(email);
        }
    
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
    
        return user;
    }

    async registerFarmer(registerUserDto: RegisterUserDto): Promise<Farmer> {
        const farmerExists = await this.farmerService.findOneUserByEmail(registerUserDto.email);
        if (farmerExists) {
            throw new ConflictException('Farmer already exists with this email');
        }
    
        const farmer = await this.farmerService.createFarmer({
            email: registerUserDto.email,
            password: registerUserDto.password,
            name: registerUserDto.name,
            role: Role.FARMER,
            phone: registerUserDto.phone,
            address: registerUserDto.address,
            bio: registerUserDto.bio
        });
    
        return farmer;
    }
    
    async registerCustomer(registerUserDto: RegisterUserDto): Promise<Customer> {
        const customerExists = await this.customerService.findOneUserByEmail(registerUserDto.email);
        if (customerExists) {
            throw new ConflictException('Customer already exists with this email');
        }
    
        const customer = await this.customerService.createCustomer({
            email: registerUserDto.email,
            password: registerUserDto.password,
            name: registerUserDto.name,
            role: Role.CUSTOMER,
            phone: registerUserDto.phone,
            address: registerUserDto.address
        });
    
        return customer;
    }

    async login(email: string, password: string): Promise<{ access_token: string; user: Farmer | Customer }> {
        const user = await this.validateUser(email, password);
    
        const payload = { email: user.email, sub: user._id, role: user.role };
        const access_token = await this.jwtService.signAsync(payload);
    
        return { access_token, user };
    }

    async logout(user: any) {
        const token = user.token;
        this.tokenBlacklist.add(token);
        return { message: 'Logged out successfully' };
    }

    isTokenBlacklisted(token: string ): boolean {
        return this.tokenBlacklist.has(token);
    }

    async storeOtp(email: string, otp: string) {
        const expires = Date.now() + 300000; // OTP valid for 5 minutes
        this.otpStore[email] = { otp, expires };
    }

    async verifyOtp(email: string, otp: string): Promise<boolean> {
        const record = this.otpStore[email];
        if (!record) {
            throw new UnauthorizedException('OTP not found or expired');
        }
        const { otp: storedOtp, expires } = record;
        if (Date.now() > expires) {
            delete this.otpStore[email];
            throw new UnauthorizedException('OTP expired');
        }
        if (storedOtp !== otp) {
            throw new UnauthorizedException('Invalid OTP');
        }
        return true;
    }

    async resetPassword(email: string, newPassword: string) {
        const farmer = await this.farmerService.findOneByEmail(email);
        if (farmer) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            farmer.password = hashedPassword;
            await farmer.save();
            return;
        }
    
        const customer = await this.customerService.findOneByEmail(email);
        if (customer) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            customer.password = hashedPassword;
            await customer.save();
            return;
        }
    
        throw new NotFoundException('User  not found');
    }

}