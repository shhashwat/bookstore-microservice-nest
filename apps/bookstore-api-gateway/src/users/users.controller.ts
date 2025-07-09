import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from 'apps/users/src/dto/user.dto';
import { Observable } from 'rxjs';

@Controller('users')
export class UsersController {
    constructor (private usersService: UsersService) {}

    @Get()
    findAll(): Observable<UserDto[]> {
        return this.usersService.findAll();
    }
}
