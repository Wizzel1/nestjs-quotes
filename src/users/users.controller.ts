import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResponseDto } from './dto/user.response.dto';
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
    const dtos = plainToInstance(UserResponseDto, users, {
      enableImplicitConversion: true,
    });

    for (const dto of dtos) {
      const error = await validate(dto);
      if (error.length > 0) {
        console.log(error[0]);
        throw new NotFoundException('Error getting alls users');
      }
    }
    return dtos;
  }

  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.findById(id);
    const dtos = plainToInstance(UserResponseDto, user);
    return dtos;
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
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UserRequestDto,
  ) {
    return this.usersService.updateUser(id, body);
  }
}
