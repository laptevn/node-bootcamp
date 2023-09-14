import {Module} from '@nestjs/common';
import {CategoryResolver} from "./category.resolver";
import {CategoryService} from "./category.service";
import {CategoryEntity} from "./category.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([CategoryEntity])],
    providers: [CategoryResolver, CategoryService],
})
export class CategoryModule {
}
