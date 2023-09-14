import {
    Query,
    Resolver
} from '@nestjs/graphql';
import {Category} from "./category.model";
import {CategoryService} from "./category.service";

@Resolver(of => Category)
export class CategoryResolver {
    constructor(private readonly categoryService: CategoryService) {
    }

    @Query(returns => [Category])
    categories(): Promise<Category[]> {
        return this.categoryService.getAll();
    }
}
