import { IsString, IsInt, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class QuoteResponseDto {
  @IsInt()
  @Expose()
  @IsNotEmpty()
  id: number;

  @IsString()
  @Expose()
  @IsNotEmpty()
  author: string;

  @IsString()
  @Expose()
  @IsNotEmpty()
  quote: string;
}
