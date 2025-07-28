import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResponseDto } from './dto/user.response.dto';
import { User } from './entities/user.entity';
import { UserRequestDto } from './dto/user.request.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Controller('users')
@UsePipes(new ValidationPipe())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersService.findAll();
    const usersArray: User[] = [];

    return users;

    for (const user of users) {
      const dto = plainToInstance(UserResponseDto, user, {
        strategy: 'excludeAll',
      });

      const error = await validate(dto);
      if (error.length > 0) {
        console.error(error);
        throw new InternalServerErrorException(
          'Validation failed while getting all quotes',
        );
      }
      usersArray.push(user);
    }
    return usersArray;
  }

  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.findById(id);
    const dtos = plainToInstance(UserResponseDto, user);

    return user;
  }

  @Post()
  async createUser(@Body() body: UserRequestDto): Promise<UserResponseDto> {
    return this.usersService.createNewUser(body);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUserById(id);
  }

  @Put(':id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() body) {
    return this.usersService.updateUser(id, body);
  }
}
