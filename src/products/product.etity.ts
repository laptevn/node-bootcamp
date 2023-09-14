import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import {CategoryEntity} from "../categories/category.entity";

@Entity({name: 'product'})
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => ProductEntity, product => product.category)
    @JoinColumn()
    category: CategoryEntity;
}
