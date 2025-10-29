import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { FindUserDto } from './dto/find-user.dto';
import { mapToFindUserDto } from './mapping/user.mapper';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<FindUserDto> {
    const { email } = createUserDto;

    const existingUser = await this.userRepository.findOne({ email });
    if (existingUser) throw new BadRequestException(`User with email ${email} already exists`);

    const user = this.em.create(User, {
      name: createUserDto.name,
      surname: createUserDto.surname,
      email: createUserDto.email,
      password: createUserDto.password,
      status: 'I',
      isActive: true,
      createdAt: new Date()
    });

    await this.em.persistAndFlush(user);
    return mapToFindUserDto(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOneById(id: number): Promise<FindUserDto> {
    const user = await this.userRepository.findOne({ id });

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return mapToFindUserDto(user);
  }

  async findOneByEmail(email: string): Promise<FindUserDto> {
    const user = await this.userRepository.findOne({ email });

    if (!user) throw new NotFoundException(`User with email ${email} not found`);

    return mapToFindUserDto(user);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
