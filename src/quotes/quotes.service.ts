import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity';
import type { Repository } from 'typeorm';
import * as fs from 'fs-extra';
import * as path from 'path';
//import data from "../data/quotes.json"
@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private quotesRepository: Repository<Quote>,
  ) {}

  async findAll(): Promise<Quote[]> {
    return this.quotesRepository.find();
  }

  async findById(id: number): Promise<Quote | null> {
    return this.quotesRepository.findOneBy({ id });
  }

  async migrate(): Promise<void> {
    const PATH = path.join(__dirname, '../../src/data/quotes.json');
    await fs.readJson(PATH).then(async (quotes) => {
      for (const quote of quotes) {
        await this.quotesRepository.save(quote);
      }
    });
  }
}
