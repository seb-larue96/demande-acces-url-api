import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'User login' })
    @ApiResponse({ status: 200, description: 'The user has been successfully logged in.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    login(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto);
    }

    @Post('register')
    @ApiOperation({ summary: 'User registration' })
    @ApiResponse({ status: 201, description: 'The user has been successfully registered.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }
}
