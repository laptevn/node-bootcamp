import {Injectable} from '@nestjs/common';
import {Category} from "./category.model";
import {InjectRepository} from "@nestjs/typeorm";
import {CategoryEntity} from "./category.entity";
import {Repository} from "typeorm";
import {CategoryDTO} from "./category.dto";

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>) {
    }

    async getAll(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    async createCategory(categoryDTO: CategoryDTO): Promise<Category> {
        return this.categoryRepository.save({ ...categoryDTO });
    }
}
