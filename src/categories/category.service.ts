import {Injectable} from '@nestjs/common';
import {Category} from "./category.model";
import {CategoryRepository} from "./category.repository";

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) {
    }

    async getAll(): Promise<Category[]> {
        return this.categoryRepository.findAll();
    }
}
