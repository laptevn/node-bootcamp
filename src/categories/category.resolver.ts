import {
    Args,
    Mutation,
    Query,
    Resolver
} from '@nestjs/graphql';
import {Category} from "./category.model";
import {CategoryService} from "./category.service";
import {CategoryDTO} from "./category.dto";
import {AuthGuard} from "../auth/auth.guard";
import {UseGuards} from "@nestjs/common";
import {Roles} from "../auth/roles.decorator";

@Resolver(of => Category)
@UseGuards(AuthGuard)
export class CategoryResolver {
    constructor(private readonly categoryService: CategoryService) {
    }

    @Query(returns => [Category])
    @Roles(['admin', 'customer'])
    categories(): Promise<Category[]> {
        return this.categoryService.getAll();
    }

    @Mutation(returns => Category)
    @Roles(['admin'])
    async addCategory(@Args('category') categoryDTO: CategoryDTO): Promise<Category> {
        return this.categoryService.createCategory(categoryDTO);
    }
}
