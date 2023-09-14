import {Field, ID, ObjectType} from '@nestjs/graphql';
import {Category} from "../categories/category.model";

@ObjectType({description: 'product'})
export class Product {
    @Field(type => ID)
    id: number;

    @Field()
    name: string;

    @Field()
    category: Category;
}
