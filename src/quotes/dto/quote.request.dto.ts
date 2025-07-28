import { IsNotEmpty, IsString } from "class-validator";


export class QuoteRequestDto {
  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  quote: string;
}