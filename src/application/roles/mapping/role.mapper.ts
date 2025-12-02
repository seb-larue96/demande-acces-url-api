import { RoleResponseDto } from "../dto/role-response.dto";
import { Role } from "../entities/role.entity";

export function mapToRoleResponseDto(role: Role): RoleResponseDto {
    return {
        id: role.id,
        name: role.name,
    }
}