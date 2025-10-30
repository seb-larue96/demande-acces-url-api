import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    surname: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}