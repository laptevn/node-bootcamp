import {
    Args,
    Mutation,
    Query,
    Resolver
} from '@nestjs/graphql';
import {Category} from "./category.model";
import {CategoryService} from "./category.service";
import {Product} from "../products/product.model";
import {ProductDTO} from "../products/product.dto";
import {CategoryDTO} from "./category.dto";

@Resolver(of => Category)
export class CategoryResolver {
    constructor(private readonly categoryService: CategoryService) {
    }

    @Query(returns => [Category])
    categories(): Promise<Category[]> {
        return this.categoryService.getAll();
    }

    @Mutation(returns => Category)
    async addCategory(@Args('category') categoryDTO: CategoryDTO): Promise<Category> {
        return this.categoryService.createCategory(categoryDTO);
    }
}
