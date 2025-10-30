import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService
    ) {}

    async signIn(signInDto: SignInDto): Promise<UserResponseDto> {
        return this.usersService.validateUser(signInDto.email, signInDto.password);
    }

    async register(registerDto: RegisterDto): Promise<UserResponseDto> {
        const existingMail = await this.usersService.validateEmail(registerDto.email);
        if (existingMail) throw new BadRequestException('Email already in use');
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(registerDto.password, salt); 

        const newUser = { ...registerDto, password: hashedPassword };
        return await this.usersService.create(newUser);
    }
}
