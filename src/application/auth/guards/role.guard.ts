import { EntityRepository } from "@mikro-orm/mysql";
import { InjectRepository } from "@mikro-orm/nestjs";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/application/roles/entities/role.entity";
import { ROLES_KEY } from "src/decorators/role.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @InjectRepository(Role)
        private readonly roleRepository: EntityRepository<Role>
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const requiredRoleNames = this.reflector.getAllAndOverride<string[]>(
            ROLES_KEY, 
            [context.getHandler(), context.getClass()],
        );

        if (!requiredRoleNames || requiredRoleNames.length === 0) return true;

        const requiredRoles = await this.roleRepository.find({
            name: { $in: requiredRoleNames },
            status: { $ne: 'D' }
        })
        if (requiredRoles.length !== requiredRoleNames.length) throw new Error('Some roles in @Roles() do not exist in the database.');

        const requiredMinLevel = Math.min(...requiredRoles.map(r => r.level));
        
        const userRole = await this.roleRepository.findOneOrFail({
            name: user.role,
            status: { $ne: 'D' },
        });
        const userLevel = userRole.level;

        return userLevel >= requiredMinLevel;
    }
}