import {Field, ID, ObjectType} from '@nestjs/graphql';

@ObjectType({description: 'category'})
export class Category {
    @Field(type => ID)
    id: number;

    @Field()
    name: string;
}
