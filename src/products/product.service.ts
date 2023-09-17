import {Injectable} from '@nestjs/common';
import {Product} from "./product.model";
import {ProductDTO} from "./product.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ProductEntity} from "./product.entity";

@Injectable()
export class ProductService {
    constructor(@InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>) {
    }

    async getProducts(categoryId: number): Promise<Product[]> {
        return this.productRepository.find({where: {category: {id: categoryId}}});
    }

    async getProduct(id: number): Promise<Product> {
        return this.productRepository.findOneBy({id});
    }

    async createProduct(productDTO: ProductDTO): Promise<Product> {
        return this.productRepository.save({
            name: productDTO.name,
            category: {id: productDTO.category}
        });
    }

    async updateProduct(id: number, productDTO: ProductDTO): Promise<Product> {
        await this.productRepository.update(id, {
            name: productDTO.name,
            category: {id: productDTO.category}
        });
        return this.getProduct(id);
    }

    async removeProduct(id: number): Promise<void> {
        await this.productRepository.delete(id);
    }
}
