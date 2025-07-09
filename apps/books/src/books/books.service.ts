import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookDto } from './dto/book.dto';

@Injectable()
export class BooksService {
  private books: BookDto[] = [
    {
      id: 1,
      title: 'Courage To Be Disliked',
      author: 'Fumitake Koga',
      rating: 4.2
    },
    {
      id: 2,
      title: 'Art of war',
      author: 'Sun Tzu',
      rating: 4.5
    },
    {
      id: 3,
      title: 'Dragon Ball',
      author: 'Akira Toriyama',
      rating: 5
    }
  ];
  
  create(createBookDto: CreateBookDto): BookDto {
    const highestBookById = [...this.books].sort((a,b) => b.id - a.id);
    const newBook: BookDto = {
      ...createBookDto,
      id: highestBookById[0].id + 1
    }
    this.books.push(newBook);
    return newBook;
  }

  findAll(): BookDto[] {
    return this.books;
  }

  findOne(id: number): BookDto {
    const oneBook = this.books.find((book) => book.id === id);
    if (!oneBook) throw new NotFoundException(`Book with id ${id} not found`);
    return oneBook;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    this.books = this.books.map((book)=>{
      if(book.id === id) return {...book, ...updateBookDto};
      return book;
    });

    return this.findOne(+id);
  }

  remove(id: number) {
    const removedBook = this.findOne(+id);
    this.books = this.books.filter((book)=> book.id !== id);
    return removedBook;
  }
}
