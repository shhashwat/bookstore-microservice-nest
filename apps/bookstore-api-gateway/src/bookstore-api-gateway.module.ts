import { Module } from '@nestjs/common';
import { BookstoreApiGatewayController } from './bookstore-api-gateway.controller';
import { BookstoreApiGatewayService } from './bookstore-api-gateway.service';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { ClientConfigModule } from './client-config/client-config.module';

@Module({
  imports: [UsersModule, BooksModule, ClientConfigModule],
  controllers: [BookstoreApiGatewayController],
  providers: [BookstoreApiGatewayService],
})
export class BookstoreApiGatewayModule {}
