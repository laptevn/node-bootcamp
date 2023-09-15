import {Injectable, OnModuleInit, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserEntity} from "./user.entity";
import {User} from "./user.model";
import {HashService} from "./hash.service";
import {JwtService} from "@nestjs/jwt";
import {Token} from "./token.model";

@Injectable()
export class AuthService implements OnModuleInit {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
                private readonly hashService: HashService,
                private readonly jwtService: JwtService) {
    }

    async onModuleInit(): Promise<void> {
        await this.addDefaultUsers();
    }

    private async addDefaultUsers(): Promise<void> {
        await this.addUserIfNotExist('admin', await this.hashService.hashPassword('admin'), 'admin');
        await this.addUserIfNotExist('customer', await this.hashService.hashPassword('customer'), 'customer');
    }

    private async addUserIfNotExist(name: string, password: string, role: string): Promise<void> {
        if (!await this.userRepository.findOneBy({name: name})) {
            await this.userRepository.save({
                name: name,
                password: password,
                role: role
            });
        }
    }

    private async getUser(name: string): Promise<User> {
        return this.userRepository.findOneBy({name});
    }

    async signIn(name: string, password: string): Promise<Token> {
        const user = await this.getUser(name);
        if (!(user && await this.hashService.matchHash(password, user.password))) {
            throw new UnauthorizedException();
        }

        return {
            access_token: await this.jwtService.signAsync({
                name: user.name,
                role: user.role
            }),
        };
    }
}
