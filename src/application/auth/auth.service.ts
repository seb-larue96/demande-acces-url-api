import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async signIn(user: UserResponseDto): Promise<string> {
        const payload = { id: user.id, name: user.name, surname: user.surname, email: user.email };
        const access_token = this.jwtService.sign(payload);
        return access_token;
    }

    async logout() {
        return { message: 'Logged out successfully' };
    }

    async register(registerDto: RegisterDto): Promise<UserResponseDto> {
        const existingMail = await this.usersService.validateUserByEmail(registerDto.email);
        if (existingMail) throw new BadRequestException('Email already in use');
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(registerDto.password, salt); 

        const newUser = { ...registerDto, password: hashedPassword };
        return await this.usersService.create(newUser);
    }
}
