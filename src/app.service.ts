import { Injectable } from '@nestjs/common';
import { QuotesService } from './quotes/quotes.service';

@Injectable()
export class AppService {
  constructor(private readonly quotesService: QuotesService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async migrate(): Promise<void> {
    return this.quotesService.migrate();
  }
}
