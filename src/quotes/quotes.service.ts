import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity';
import type { Repository } from 'typeorm';
import * as fs from 'fs-extra';
import * as path from 'path';
import { QuoteRequestDto } from './dto/quote.request.dto';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private quotesRepository: Repository<Quote>,
  ) {}

  async findBy(options: {
    page?: number;
    limit?: number;
    author?: string;
    randomize?: boolean;
  }): Promise<Quote[]> {
    if (options.randomize) {
      return this.getRandomQuotes(options.limit);
    }

    if (options.page === undefined && options.limit === undefined) {
      return this.quotesRepository.find();
    }

    const limitFound = options.limit ?? 2;
    const pageFound = options.page ?? 1;
    const skip = (pageFound - 1) * limitFound;

    return this.quotesRepository.find({
      skip,
      take: limitFound,
      order: { id: 'ASC' },
    });
  }

  async findById(id: number): Promise<Quote> {
    const quote = await this.quotesRepository.findOneBy({ id });
    if (!quote) {
      throw new NotFoundException(`Quote with ID ${id} not found.`);
    }
    return quote;
  }

  async getRandomQuotes(limit?: number) {
    const allQuotes = await this.quotesRepository.find();
    const count = allQuotes.length;
    const limitFound = limit ?? 1;
    const result: Quote[] = [];

    for (let i = 0; i < limitFound; i++) {
      const rndNumber = Math.floor(Math.random() * count);
      const quote = allQuotes.at(rndNumber);

      if (!quote) continue;
      result.push(quote);
    }

    return result;
  }

  async migrate(): Promise<void> {
    const PATH = path.join(__dirname, '../../src/data/quotes.json');
    await fs.readJson(PATH).then(async (quotes) => {
      for (const quote of quotes) {
        await this.quotesRepository.save(quote);
      }
    });
  }

  async createNewQuote(data: QuoteRequestDto): Promise<Quote> {
    const quote = this.quotesRepository.create(data);
    return this.quotesRepository.save(quote);
  }

  async deleteQuoteById(id: number): Promise<Quote> {
    const quote = await this.findById(id);
    await this.quotesRepository.delete(quote);
    return quote;
  }

  async updatePost(id: number, body: QuoteRequestDto): Promise<Quote> {
    await this.quotesRepository.update(id, body);
    return this.findById(id);
  }
}
