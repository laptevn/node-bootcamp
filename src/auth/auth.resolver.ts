import {
    Args,
    Query,
    Resolver
} from '@nestjs/graphql';
import {AuthService} from "./auth.service";
import {Token} from "./token.model";

@Resolver(of => Token)
export class AuthResolver {
    constructor(private readonly authService: AuthService) {
    }

    @Query(returns => Token)
    signIn(@Args('name') name: string, @Args('password') password: string): Promise<Token> {
        return this.authService.signIn(name, password);
    }
}
