import { UserResponseDto } from "../dto/user-response.dto";
import { User } from "../entities/user.entity";

export function mapToFindUserDto(user: User): UserResponseDto {
    return {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role.name,
        isActive: user.isActive,
    }
}