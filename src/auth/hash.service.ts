import {Injectable, OnModuleInit} from '@nestjs/common';

@Injectable()
export class HashService {
    private readonly bcrypt = require('bcrypt');
    private readonly saltRounds = 10;

    async hashPassword(password: string): Promise<string> {
        return await this.bcrypt.hash(password, this.saltRounds);
    }

    async matchHash(password: string, hash: string): Promise<boolean> {
        return await this.bcrypt.compare(password, hash);
    }
}
