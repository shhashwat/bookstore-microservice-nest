import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookDto } from './dto/book.dto';

@Controller()
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @MessagePattern('books.create')
  create(@Payload() createBookDto: CreateBookDto): BookDto {
    return this.booksService.create(createBookDto);
  }

  @MessagePattern('books.findAll')
  findAll(): BookDto[] {
    return this.booksService.findAll();
  }

  @MessagePattern('books.findOne')
  findOne(@Payload() id: number) {
    return this.booksService.findOne(id);
  }

  @MessagePattern('books.update')
  update(@Payload() updateBookDto: UpdateBookDto) {
    return this.booksService.update(updateBookDto.id, updateBookDto);
  }

  @MessagePattern('books.remove')
  remove(@Payload() id: number) {
    return this.booksService.remove(id);
  }
}
