import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity';
import { QuotesController } from './quotes.controller';

@Module({
  exports: [QuotesService],
  providers: [QuotesService],
  controllers: [QuotesController],
  imports: [TypeOrmModule.forFeature([Quote])]
})
export class QuotesModule {}
