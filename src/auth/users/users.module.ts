
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller'; // If you have a controller

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    providers: [UsersService],
    exports: [UsersService], // Export the service to use in other modules
    controllers: [UsersController], // Add if you have a controller
})
export class UsersModule {}