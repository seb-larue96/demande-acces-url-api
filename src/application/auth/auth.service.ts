import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService
    ) {}

    async signIn(signInDto: SignInDto): Promise<UserResponseDto> {
        return this.usersService.validateUser(signInDto.email, signInDto.password);
    }
}
