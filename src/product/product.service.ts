import { Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { ReviewModel } from 'src/review/review.model/review.model';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProdutDto } from './dto/find-product.dto';
import { ProductModel } from './product.model';
import { ProductModule } from './product.module';

@Injectable()
export class ProductService {
    constructor(@InjectModel(ProductModel) private readonly productModel: ModelType<ProductModel>) {}

    async create (dto: CreateProductDto): Promise<DocumentType<ProductModule>> {
        return this.productModel.create(dto)
    }
    
    async findById(id: string): Promise<DocumentType<ProductModel> | null> {
        return this.productModel.findById(id).exec()
    }

    async deleteById(id: string) {
        return this.productModel.findByIdAndDelete(id).exec()
    }

    async updateById(id: string, dto: CreateProductDto) {
        return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec()
    }

    async findWidthReviews(dto: FindProdutDto) {
        return this.productModel.aggregate([
            {
                $match: {
                    categories: dto.category,
                }
            },
            {
                $sort: {
                    _id: 1,
                },
            },
            {
                $limit: dto.limit,
            },
            {
                $lookup: {
                    from: 'Review',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'reviews',
                },
            },
            {
                $addFields: {
                    reviewCount: { $size: '$reviews' },
                    reviewAvg: { $avg: '$reviews.rating' },
                },
            },
        ]).exec() as unknown as (ProductModel & { review: ReviewModel[], reviewCount: number, reviewAbg: number })[]
    }
}
