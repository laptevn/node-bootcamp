import {
    Args, Mutation,
    Query,
    Resolver
} from '@nestjs/graphql';
import {Product} from "./product.model";
import {ProductService} from "./product.service";
import {NotFoundException, UseGuards} from "@nestjs/common";
import {ProductDTO} from "./product.dto";
import {AuthGuard} from "../auth/auth.guard";
import {Roles} from "../auth/roles.decorator";

@Resolver(of => Product)
@UseGuards(AuthGuard)
export class ProductResolver {
    constructor(private readonly productService: ProductService) {
    }

    @Query(returns => [Product])
    @Roles(['admin', 'customer'])
    products(@Args('categoryId') categoryId: number): Promise<Product[]> {
        return this.productService.getProducts(categoryId);
    }

    @Query(returns => Product)
    @Roles(['admin', 'customer'])
    async product(@Args('id') id: number): Promise<Product> {
        const product = await this.productService.getProduct(id);
        if (!product) {
            throw new NotFoundException(id);
        }
        return product;
    }

    @Mutation(returns => Product)
    @Roles(['admin'])
    async addProduct(@Args('product') productDTO: ProductDTO): Promise<Product> {
        return this.productService.createProduct(productDTO);
    }

    @Mutation(returns => Product)
    @Roles(['admin'])
    async updateProduct(@Args('id') id: number, @Args('product') productDTO: ProductDTO): Promise<Product> {
        const product = await this.productService.updateProduct(id, productDTO);
        if (!product) {
            throw new NotFoundException(id);
        }
        return product;
    }

    @Mutation(returns => Boolean)
    @Roles(['admin'])
    async removeProduct(@Args('id') id: number): Promise<Boolean> {
        await this.productService.removeProduct(id);
        return true;
    }
}
