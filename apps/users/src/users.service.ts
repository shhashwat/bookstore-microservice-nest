import { Injectable } from '@nestjs/common';

import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  private users: UserDto[] = [
    {
      id: 1,
      firstName: 'Yash',
      lastName: 'Singh',
      age: 24
    },
    {
      id: 2,
      firstName: 'Shashwat',
      lastName: 'Singh',
      age: 23
    },
    {
      id: 3,
      firstName: 'Aniket',
      lastName: 'Singh',
      age: 25
    },
  ];

  findAll() {
    return this.users
  }
}
