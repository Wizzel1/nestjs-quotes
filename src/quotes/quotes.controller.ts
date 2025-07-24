import { Controller, Get } from '@nestjs/common';
import { Quote } from './entities/quote.entity';
import { QuotesService } from './quotes.service';

@Controller('quotes')
export class QuotesController {
    constructor(private readonly quotesService: QuotesService) {}

    @Get()
    async findAll(): Promise<Quote[]> {
        return this.quotesService.findAll();
    }

    @Get("/migrate")
    async migrate() {

        await this.quotesService.migrate();
        return "ABC";
    }
}
