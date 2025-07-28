import { IsNotEmpty, IsString } from 'class-validator';

export class UserRequestDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
