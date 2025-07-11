import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class ClientConfigService {
    constructor (private config: ConfigService) {};

    getBooksClientPort(): number {
        return this.config.get<number>('BOOKS_CLIENT_PORT') ?? 3002;
    }

    getUsersClientPort(): number {
        return this.config.get<number>('USERS_CLIENT_PORT') ?? 3001;
    }

    get booksClientOptions(): ClientOptions {
        return {
            transport: Transport.TCP,
            options: {
                port: this.getBooksClientPort(),
            }
        }
    }

    get usersClientOptions(): ClientOptions {
        return {
            transport: Transport.TCP,
            options: {
                port: this.getUsersClientPort(),
            }
        }
    }
}
