import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BooksService } from './books.service';

import { BookDto } from 'libs/contracts/src/books/book.dto';
import { CreateBookDto } from 'libs/contracts/src/books/create-book.dto';
import { UpdateBookDto } from 'libs/contracts/src/books/update-book.dto';

import { BOOKS_PATTERNS } from 'libs/contracts/src/books/books.patterns';

@Controller()
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @MessagePattern(BOOKS_PATTERNS.CREATE)
  create(@Payload() createBookDto: CreateBookDto): BookDto {
    return this.booksService.create(createBookDto);
  }

  @MessagePattern(BOOKS_PATTERNS.FIND_ALL)
  findAll(): BookDto[] {
    return this.booksService.findAll();
  }

  @MessagePattern(BOOKS_PATTERNS.FIND_ONE)
  findOne(@Payload() id: number) {
    return this.booksService.findOne(id);
  }

  @MessagePattern(BOOKS_PATTERNS.UPDATE)
  update(@Payload() updateBookDto: UpdateBookDto) {
    return this.booksService.update(updateBookDto.id, updateBookDto);
  }

  @MessagePattern(BOOKS_PATTERNS.REMOVE)
  remove(@Payload() id: number) {
    return this.booksService.remove(id);
  }
}
