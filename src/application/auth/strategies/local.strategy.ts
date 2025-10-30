import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserResponseDto } from "src/application/users/dto/user-response.dto";
import { UsersService } from "src/application/users/users.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UsersService) {
        super({ 
            usernameField: 'email',
        });
    }

    async validate(email: string, password: string): Promise<UserResponseDto> {
        const user = await this.userService.validateUser(email, password);
        if(!user) throw new UnauthorizedException();
        return user;
    }
}