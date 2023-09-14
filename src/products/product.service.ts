import {Injectable} from '@nestjs/common';
import {ProductRepository} from "./product.repository";
import {Product} from "./product.model";
import {ProductDTO} from "./product.dto";

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {
    }

    async getProducts(categoryId: string): Promise<Product[]> {
        return this.productRepository.findAll(categoryId);
    }

    async getProduct(id: string): Promise<Product> {
        return this.productRepository.find(id);
    }

    async createProduct(productDTO: ProductDTO): Promise<Product> {
        return this.productRepository.create(productDTO);
    }

    async updateProduct(id: string, productDTO: ProductDTO): Promise<Product> {
        return this.productRepository.update(id, productDTO);
    }

    async removeProduct(id: string): Promise<void> {
        await this.productRepository.remove(id);
    }
}
