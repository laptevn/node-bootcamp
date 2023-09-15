import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthService} from "./auth.service";
import {UserEntity} from "./user.entity";
import {HashService} from "./hash.service";
import {AuthResolver} from "./auth.resolver";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./constants";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '6000s' },
        })
    ],
    providers: [AuthService, HashService, AuthResolver],
})
export class AuthModule {
}
