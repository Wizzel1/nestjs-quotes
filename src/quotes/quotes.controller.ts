import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { Quote } from './entities/quote.entity';
import { QuotesService } from './quotes.service';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get()
  async findAll(): Promise<Quote[]> {
    return this.quotesService.findAll();
  }

  @Get('migrate')
  async migrate() {
    await this.quotesService.migrate();
    return 'ABC';
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
}
