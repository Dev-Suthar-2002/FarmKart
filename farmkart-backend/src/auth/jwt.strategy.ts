import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { FarmerService } from '../farmer/farmer.service';
import { CustomerService } from 'src/customer/customer.service';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly farmerService: FarmerService,
        private readonly customerService: CustomerService,
        private readonly authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: any) {
        const token = ExtractJwt.fromAuthHeaderAsBearerToken();
        if (this.authService.isTokenBlacklisted(token)) {
            throw new UnauthorizedException('Token has been blacklisted');
        }

        if (payload.role === 'farmer') {
            return this.farmerService.findOne(payload.sub);
        } else if (payload.role === 'customer') {
            return this.customerService.findOne(payload.sub);
        }
        throw new Error('User  type not recognized');
    }
}