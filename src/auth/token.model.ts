import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType({description: 'token'})
export class Token {
    @Field()
    access_token: string;
}
