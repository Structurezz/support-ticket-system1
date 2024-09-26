import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users/user.schema'; // Corrected path if needed
import { CreateUserDto } from './users/dto/create-user.dto'; // Corrected path if needed
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService,
    ) {}

    async register(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
        const { email, phoneNumber, password } = createUserDto;

        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new this.userModel({ email, phoneNumber, password: hashedPassword });

        // Save the user
        await newUser.save();

        // Return user without password
        const { password: _, ...userWithoutPassword } = newUser.toObject(); // Exclude password
        return userWithoutPassword;
    }

    async login(email: string, password: string): Promise<{ access_token: string }> {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            console.log('User not found:', email);
            throw new NotFoundException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('Invalid password for user:', email);
            throw new NotFoundException('Invalid credentials');
        }

        const payload = { email: user.email };
        const access_token = this.jwtService.sign(payload);
        return { access_token };
    }

    async validateUser(email: string): Promise<any> {
        const user = await this.userModel.findOne({ email });
        if (user) {
            const { password, ...result } = user.toObject();
            return result; // Return user data without the password
        }
        return null;
    }
}
