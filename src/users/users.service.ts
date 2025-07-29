import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import type { Repository } from 'typeorm';
import { UserRequestDto } from './dto/user.request.dto';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createNewUser(data: UserRequestDto): Promise<User> {
    const user = this.usersRepository.create(data);
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    return this.usersRepository.save({
      ...user,
      password: hashedPassword,
    });
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    if (!users) {
      throw new NotFoundException(`Users not found.`);
    }
    return users;
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return user;
  }

  async deleteUserById(id: number): Promise<User> {
    const user = await this.findById(id);
    await this.usersRepository.delete(user);
    return user;
  }

  async updateUser(id: number, body: UserRequestDto): Promise<User> {
    await this.usersRepository.update(id, body);
    return this.findById(id);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`User with Username ${email} not found.`);
    }
    return user;
  }
}
