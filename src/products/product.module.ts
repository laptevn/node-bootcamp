import {Module} from '@nestjs/common';
import {ProductService} from "./product.service";
import {ProductRepository} from "./product.repository";
import {ProductResolver} from "./product.resolver";

@Module({
    providers: [ProductResolver, ProductService, ProductRepository],
})
export class ProductModule {
}
