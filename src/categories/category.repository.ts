import {Injectable} from '@nestjs/common';
import {Category} from "./category.model";

@Injectable()
export class CategoryRepository {
    async findAll(): Promise<Category[]> {
        return [
            {
                id: '1',
                name: 'Category 1'
            },
            {
                id: '2',
                name: 'Category 2'
            }
        ];
    }
}
