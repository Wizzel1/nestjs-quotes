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
} from '@nestjs/common';
import { Quote } from './entities/quote.entity';
import { QuotesService } from './quotes.service';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get()
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('randomize', new ParseBoolPipe({ optional: true }))
    randomize?: boolean,
    @Query('author') author?: string,
  ) {
    return this.quotesService.findBy({ page, limit, author, randomize });
  }

  @Get(':id')
  async getQuoteById(@Param('id', ParseIntPipe) id: number) {
    return this.quotesService.findById(id);
  }

  @Post('new')
  async createQuote(@Body() body: Quote) {
    return this.quotesService.createNewQuote(body);
  }

  @Delete(':id')
  async deleteQuoteById(@Param('id', ParseIntPipe) id: number) {
    return this.quotesService.deleteQuoteById(id);
  }

  @Put(':id')
  async updateQuote(@Param('id', ParseIntPipe) id: number, @Body() body: Quote) {
    return this.quotesService.updatePost(id, body);
  }
}
