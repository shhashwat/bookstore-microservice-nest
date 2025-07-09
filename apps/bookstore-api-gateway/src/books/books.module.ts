import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { BooksService } from './books.service';
import { BooksController } from './books.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BOOKS_CLIENT',
        transport: Transport.TCP,
        options: { port: 3002 }
      }
    ])
  ],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}
