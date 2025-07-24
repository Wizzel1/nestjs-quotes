import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity';
import type { Repository } from 'typeorm';
import * as fs from 'fs-extra';
import * as path from 'path';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private quotesRepository: Repository<Quote>,
  ) {}

  async findAll(): Promise<Quote[]> {
    return this.quotesRepository.find();
  }

  async findById(id: number): Promise<Quote> {
    const quote = await this.quotesRepository.findOneBy({ id });
    if (!quote) {
      throw new NotFoundException(`Quote with ID ${id} not found.`);
    }
    return quote;
  }

  async migrate(): Promise<void> {
    const PATH = path.join(__dirname, '../../src/data/quotes.json');
    await fs.readJson(PATH).then(async (quotes) => {
      for (const quote of quotes) {
        await this.quotesRepository.save(quote);
      }
    });
  }

  async createNewQuote(data: Quote): Promise<Quote> {
    const quote = this.quotesRepository.create(data);
    return await this.quotesRepository.save(quote);
  }

  async deleteQuoteById(id: string): Promise<Quote> {
    const quote = await this.findById(Number(id));
    await this.quotesRepository.delete(quote);
    return quote;
  }
}
