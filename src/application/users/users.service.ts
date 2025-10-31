import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
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
    const { email } = createUserDto;

    const existingUser = await this.userRepository.findOne({ email });
    if (existingUser) throw new BadRequestException(`User with email ${email} already exists`);

    const newUser = this.em.create(User, {
      name: createUserDto.name,
      surname: createUserDto.surname,
      email: createUserDto.email,
      password: createUserDto.password,
      status: 'I',
      isActive: true,
      createdAt: new Date()
    });

    await this.em.persistAndFlush(newUser);
    return mapToFindUserDto(newUser);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();
    return users.map(user => mapToFindUserDto(user));
  }

  async findOneById(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ id });

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return mapToFindUserDto(user);
  }

  async findOneByEmail(email: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ email });

    if (!user) throw new NotFoundException(`User with email ${email} not found`);

    return mapToFindUserDto(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async validateUser(email: string, password: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ email });
    if (!user) throw new BadRequestException('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new BadRequestException('Password does not match');

    return mapToFindUserDto(user);
  }

  async validateUserById(id: number): Promise<boolean> {
    const user = await this.userRepository.findOne({ id });
    return !!user;
  }

  async validateUserByEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ email });
    return !!user;
  }

}
