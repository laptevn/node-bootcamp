import {
    Args, Mutation,
    Query,
    Resolver
} from '@nestjs/graphql';
import {Product} from "./product.model";
import {ProductService} from "./product.service";
import {NotFoundException} from "@nestjs/common";
import {ProductDTO} from "./product.dto";

@Resolver(of => Product)
export class ProductResolver {
    constructor(private readonly productService: ProductService) {
    }

    @Query(returns => [Product])
    products(@Args('categoryId') categoryId: string): Promise<Product[]> {
        return this.productService.getProducts(categoryId);
    }

    @Query(returns => Product)
    async product(@Args('id') id: string): Promise<Product> {
        const product = await this.productService.getProduct(id);
        if (!product) {
            throw new NotFoundException(id);
        }
        return product;
    }

    @Mutation(returns => Product)
    async addProduct(@Args('product') productDTO: ProductDTO): Promise<Product> {
        return this.productService.createProduct(productDTO);
    }

    @Mutation(returns => Product)
    async updateProduct(@Args('id') id: string, @Args('product') productDTO: ProductDTO): Promise<Product> {
        const product = await this.productService.updateProduct(id, productDTO);
        if (!product) {
            throw new NotFoundException(id);
        }
        return product;
    }

    @Mutation(returns => Boolean)
    async removeProduct(@Args('id') id: string): Promise<Boolean> {
        await this.productService.removeProduct(id);
        return true;
    }
}
