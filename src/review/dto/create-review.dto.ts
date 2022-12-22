import { IsNumber, IsString, Min, Max } from 'class-validator/types/decorator/decorators'

export class CreateReviewDto {
    @IsString()
    name: string

    @IsString()
    title: string

    @IsString()
    description: string

    @Max(5)
    @Min(1)
    @IsNumber()
    rating: number

    @IsString()
    productId: string
}