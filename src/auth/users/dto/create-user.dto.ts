import { IsNotEmpty, IsString, IsEmail, Matches } from 'class-validator';

export class CreateUserDto {
  

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^\d{10,15}$/, { message: 'phoneNumber must be a valid phone number' }) // Adjust regex as necessary
    phoneNumber: string;
}
