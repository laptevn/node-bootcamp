import {Module} from '@nestjs/common';
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {GraphQLModule} from "@nestjs/graphql";
import {CategoryModule} from "./categories/category.module";
import {ProductModule} from "./products/product.module";

@Module({
    imports: [
        CategoryModule,
        ProductModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'src/schema.gql'
        })
    ]
})
export class AppModule {
}
