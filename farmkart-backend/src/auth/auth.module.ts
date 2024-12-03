import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FarmerService } from '../farmer/farmer.service';
import { JwtStrategy } from './jwt.strategy';
import { FarmerModule } from 'src/farmer/farmer.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomerModule } from 'src/customer/customer.module';
import { MailService } from './mail.service';
// import { LocalStrategy } from './local.strategy';

@Module({
    imports: [FarmerModule, CustomerModule,
        JwtModule.registerAsync({
            global: true,
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '60m' },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, MailService],
    exports: [AuthService],

})
export class AuthModule { }