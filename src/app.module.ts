import {Module} from '@nestjs/common';
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {GraphQLModule} from "@nestjs/graphql";
import {CategoryModule} from "./categories/category.module";
import {ProductModule} from "./products/product.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "./auth/auth.module";

@Module({
    imports: [
        CategoryModule,
        ProductModule,
        AuthModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'src/schema.gql'
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'postgres',
            autoLoadEntities: true,
            synchronize: true,
        })
    ]
})
export class AppModule {
}
