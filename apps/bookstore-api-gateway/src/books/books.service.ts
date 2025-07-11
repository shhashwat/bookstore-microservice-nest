import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

import { BOOKS_PATTERNS } from 'libs/contracts/src/books/books.patterns';
import { BookDto as ClientBookDto } from 'libs/contracts/src/books/book.dto';
import { CreateBookDto as ClientCreateBookDto } from 'libs/contracts/src/books/create-book.dto';
import { UpdateBookDto as ClientUpdateBookDto } from 'libs/contracts/src/books/update-book.dto';

import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookDto } from './dto/book.dto';
import { BOOKS_CLIENT } from './constants';

@Injectable()
export class BooksService {
  constructor(@Inject(BOOKS_CLIENT) private booksClient: ClientProxy) {}

  private mapBookDto(bookDto: ClientBookDto): BookDto{
    return {
      id: bookDto.id,
      title: bookDto.title,
    }
  }

  create(createBookDto: CreateBookDto) {
    return this.booksClient.send<ClientBookDto, ClientCreateBookDto>(
      BOOKS_PATTERNS.CREATE,
      createBookDto
    ).pipe(map(this.mapBookDto));
  }

  findAll() {
    return this.booksClient.send<ClientBookDto[]>(
      BOOKS_PATTERNS.FIND_ALL, {}
    );
  }

  findOne(id: number) {
    return this.booksClient.send<ClientBookDto>(
      BOOKS_PATTERNS.FIND_ONE,
      {id}
    );
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.booksClient.send<ClientBookDto, ClientUpdateBookDto>(
      BOOKS_PATTERNS.UPDATE,
      { id, ...updateBookDto }
    );
  }

  remove(id: number) {
    return this.booksClient.send<ClientBookDto>(
      BOOKS_PATTERNS.REMOVE,
      {id}
    );
  }
}
