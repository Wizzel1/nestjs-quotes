import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { Quote } from './entities/quote.entity';
import { QuotesService } from './quotes.service';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get()
  async findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<Quote[]> {
    return this.quotesService.findAll(page, limit);
  }

  @Get('migrate')
  async migrate() {
    await this.quotesService.migrate();
    return 'ABC';
  }

  @Get('random')
  async getRandomQuote(@Query('limit') limit: string) {
    console.log('CONTROLLER CONSOLE LOG', 'Limit: ', limit);
    return this.quotesService.getRandomQuotes(Number(limit));
  }

  @Get(':id')
  async getQuoteById(@Param('id') id: string) {
    return this.quotesService.findById(Number(id));
  }

  @Post('new')
  async createQuote(@Body() body: Quote) {
    return this.quotesService.createNewQuote(body);
  }

  @Delete(':id')
  async deleteQuoteById(@Param('id') id: string) {
    return this.quotesService.deleteQuoteById(id);
  }

  @Put(':id')
  async updateQuote(@Param('id') id: string, @Body() body: Quote) {
    return this.quotesService.updatePost(id, body);
  }
}
