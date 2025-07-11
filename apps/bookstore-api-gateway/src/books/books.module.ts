import { Module } from '@nestjs/common';
import { ClientProxyFactory} from '@nestjs/microservices';

import { ClientConfigModule } from '../client-config/client-config.module';
import { ClientConfigService } from '../client-config/client-config.service';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BOOKS_CLIENT } from './constants';

@Module({
  imports: [ClientConfigModule],
  controllers: [BooksController],
  providers: [
    BooksService,
    {
      provide: BOOKS_CLIENT,
      useFactory: (configService: ClientConfigService) => {
        const clientOptions = configService.booksClientOptions;
        return ClientProxyFactory.create(clientOptions); 
      },
      inject: [ClientConfigService],
    }
  ],
})
export class BooksModule {}
