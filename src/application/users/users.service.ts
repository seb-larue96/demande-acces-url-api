import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { UserResponseDto } from './dto/user-response.dto';
import { mapToFindUserDto } from './mapping/user.mapper';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const { email, roleId } = createUserDto;

    const existingUser = await this.userRepository.findOne({ email, status: { $ne: 'D' } });
    if (existingUser) throw new BadRequestException(`User with email ${email} already exists`);

    const role = await this.resolveRole(roleId);

    const newUser = this.em.create(User, {
      name: createUserDto.name,
      surname: createUserDto.surname,
      email: createUserDto.email,
      password: createUserDto.password,
      role: role,
      status: 'I',
      isActive: true,
      createdAt: new Date()
    });

    await this.em.persistAndFlush(newUser);
    return mapToFindUserDto(newUser);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find({ status: { $ne: 'D' } });
    return users.map(user => mapToFindUserDto(user));
  }

  async findOneById(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ id, status: { $ne: 'D' } });

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return mapToFindUserDto(user);
  }

  async findOneByEmail(email: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ email, status: { $ne: 'D' } });

    if (!user) throw new NotFoundException(`User with email ${email} not found`);

    return mapToFindUserDto(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ id, status: { $ne: 'D' } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    this.em.assign(user, updateUserDto, { mergeObjectProperties: true });
    user.status = 'M';

    await this.em.flush();
    return mapToFindUserDto(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ id, status: { $ne: 'D' } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    this.em.assign(user, { status: 'D' });

    await this.em.flush();
  }

  async validateUser(email: string, password: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ email, status: { $ne: 'D' } });
    if (!user) throw new BadRequestException('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new BadRequestException('Password does not match');

    return mapToFindUserDto(user);
  }

  async validateUserById(id: number): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findOne({ id, status: { $ne: 'D' } });
    return user ? mapToFindUserDto(user) : null;
  }

  async validateUserByEmail(email: string): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findOne({ email, status: { $ne: 'D' } });
    return user ? mapToFindUserDto(user) : null;
  }

  private async resolveRole(roleId?: number): Promise<Role> {
    let role: Role | null = null;

    if (roleId) {
      role = await this.em.findOne(Role, {
        id: roleId,
        status: { $ne: 'D' },
      });

      if (!role) throw new BadRequestException(`Role with id ${roleId} not found or inactive`);
      return role;
    }

    role = await this.em.findOne(Role, {
      name: 'USER',
      status: { $ne: 'D' },
    });

    if (!role) throw new BadRequestException('Default USER role not found or inactive');
    return role;
  }

}
