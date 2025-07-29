import { IsString, IsInt, IsNotEmpty, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { ROLES } from '../entities/user.entity';

export class UserResponseDto {
  @IsInt()
  @Expose()
  @IsNotEmpty()
  id: number;

  @IsString()
  @Expose()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @Expose()
  @IsNotEmpty()
  @IsEnum(ROLES)
  role: string;
}
