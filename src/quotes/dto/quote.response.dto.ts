import { IsString, IsInt } from "class-validator";
import { Expose } from "class-transformer";

export class QuoteResponseDto {
  @IsInt()
  @Expose()
  id: number;

  @IsString()
  @Expose()
  author: string;


  @IsString()
  @Expose()
  quote: string;
}