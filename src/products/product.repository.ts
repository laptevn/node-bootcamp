import {Injectable} from '@nestjs/common';
import {Product} from "./product.model";
import {ProductDTO} from "./product.dto";

@Injectable()
export class ProductRepository {
    private readonly products: Product[] = [
        {
            id: '1',
            name: 'Product 1',
            category: '2'
        },
        {
            id: '2',
            name: 'Product 2',
            category: '2'
        }];

    async findAll(categoryId: string): Promise<Product[]> {
        return this.products
            .filter(product => product.category == categoryId);
    }

    async find(id: string): Promise<Product> {
        return this.products
            .find(product => product.id == id);
    }

    async create(productDTO: ProductDTO): Promise<Product> {
        const product = new Product();
        product.id = String(this.products.length + 1);
        product.category = productDTO.category;
        product.name = productDTO.name;
        this.products.push(product);
        return product;
    }

    async update(id: string, productDTO: ProductDTO): Promise<Product> {
        const product = await this.find(id);
        if (product) {
            product.category = productDTO.category;
            product.name = productDTO.name;
        }
        return product;
    }

    async remove(id: string): Promise<void> {
        const index = this.products.findIndex(product => product.id == id);
        if (index >= 0) {
            this.products.splice(index, 1);
        }
    }
}
