import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TicketsModule } from './tickets/tickets.module';
import { AuthModule } from './auth/auth.module';
import { configuration } from './config/database.config'; // Corrected import

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration], // Corrected configuration loading
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>('mongoUri'), // Note: 'mongoUri', not 'MONGODB_URI'
            }),
        }),
        TicketsModule,
        AuthModule,
    ],
})
export class AppModule {}
