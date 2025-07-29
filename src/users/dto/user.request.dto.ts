import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ROLES } from '../entities/user.entity';

export class UserRequestDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(ROLES)
  @IsNotEmpty()
  role: string;
}
