import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Query,
  ParseIntPipe,
  ParseBoolPipe,
  UsePipes,
  ValidationPipe,
  InternalServerErrorException,
} from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuoteRequestDto } from './dto/quote.request.dto';
import { QuoteResponseDto } from './dto/quote.response.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Quote } from './entities/quote.entity';

@Controller('quotes')
@UsePipes(new ValidationPipe())
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get()
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('randomize', new ParseBoolPipe({ optional: true }))
    randomize?: boolean,
    @Query('author') author?: string,
  ): Promise<QuoteResponseDto[]> {
    const quotes = await this.quotesService.findBy({
      page,
      limit,
      author,
      randomize,
    });
    const quotesArray: Quote[] = [];

    for (const quote of quotes) {
      const dto = plainToInstance(QuoteResponseDto, quote);

      const error = await validate(dto);
      if (error.length > 0) {
        console.error(error);
        throw new InternalServerErrorException(
          'Validation failed while getting all quotes',
        );
      }
      quotesArray.push(quote);
    }
    return quotesArray;
  }

  @Get(':id')
  async getQuoteById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<QuoteResponseDto> {
    const quote = await this.quotesService.findById(id);
    const dtos = plainToInstance(QuoteResponseDto, quote);
    console.log(dtos);

    return quote;
  }

  @Post()
  async createQuote(@Body() body: QuoteRequestDto): Promise<QuoteResponseDto> {
    return this.quotesService.createNewQuote(body);
  }

  @Delete(':id')
  async deleteQuoteById(@Param('id', ParseIntPipe) id: number) {
    return this.quotesService.deleteQuoteById(id);
  }

  @Put(':id')
  async updateQuote(@Param('id', ParseIntPipe) id: number, @Body() body) {
    return this.quotesService.updatePost(id, body);
  }
}
