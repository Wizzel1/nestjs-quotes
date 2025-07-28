import { IsString, IsInt, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

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
}
