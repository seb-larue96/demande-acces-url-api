import { FindUserDto } from "../dto/find-user.dto";
import { User } from "../entities/user.entity";

export function mapToFindUserDto(user: User): FindUserDto {
    return {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        isActive: user.isActive,
    }
}