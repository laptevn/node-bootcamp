import {Module} from '@nestjs/common';
import {ProductService} from "./product.service";
import {ProductResolver} from "./product.resolver";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductEntity} from "./product.etity";

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity])],
    providers: [ProductResolver, ProductService],
})
export class ProductModule {
}
