import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from './entities/role.entity';
import { EntityRepository } from '@mikro-orm/mysql';
import { RoleResponseDto } from './dto/role-response.dto';
import { mapToRoleResponseDto } from './mapping/role.mapper';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: EntityRepository<Role>,
  ) {}

  async findAll(): Promise<RoleResponseDto[]> {
    const roles = await this.roleRepository.find({ status: { $ne: 'D' } });
    return roles.map(role => mapToRoleResponseDto(role));
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findOne({ id, status: { $ne: 'D' } });

    if (!role) throw new NotFoundException(`Role with id ${id} not found`);

    return mapToRoleResponseDto(role);
  }
}
