import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';

@Module({
  exports: [QuotesService],
  providers: [QuotesService]
})
export class QuotesModule {}
