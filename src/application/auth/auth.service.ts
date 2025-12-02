import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/config/jwt.config';
import { UsersService } from '../users/users.service';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    ) {}

    async signIn(user: UserResponseDto): Promise<string> {
        const payload = { 
            id: user.id, 
            name: user.name, 
            surname: user.surname, 
            email: user.email 
        };

        const jwtOptions = { 
            audience: this.jwtConfiguration.audience, 
            issuer: this.jwtConfiguration.issuer, 
            secret: this.jwtConfiguration.secret, 
            expiresIn: this.jwtConfiguration.accessTokenTtl 
        };

        const access_token = await this.jwtService.signAsync(payload, jwtOptions);
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
