import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuotesModule } from './quotes/quotes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './quotes/entities/quote.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite", // <--- Specify your database type here
      database: "./src/data/database.sqlite", // <--- Path to your DB file (for SQLite) or database name
      entities: [Quote], 
      synchronize: true, 
      logging: false, // Set to 'all' or true to see SQL queries in the console (useful for debugging)
    }),
    QuotesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
