import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class ProductDTO {
    @Field()
    name: string;

    @Field()
    category: string;
}
