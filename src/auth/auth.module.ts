import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtAuthStrategy } from './jwt.strategy'; // Corrected import name
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from '../config/database.config';
import { User, UserSchema } from './users/user.schema'; // Import User and UserSchema

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('jwtSecret'),
                signOptions: { expiresIn: '60s' },
            }),
        }),
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true,
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtAuthStrategy], // Ensure JwtStrategy is listed here
    exports: [AuthService],
})
export class AuthModule {}
