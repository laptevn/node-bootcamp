import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class CategoryDTO {
    @Field()
    name: string;
}
