import { Type } from 'class-transformer'
import { IsNumber, IsString, IsOptional, IsArray, ValidateNested } from 'class-validator'

class ProductCharacteristicDto {
    @IsString()
    name: string

    @IsString()
    value: string
}

export class CreateProductDto {
    @IsString()
    image: string

    @IsString()
    title: string

    @IsNumber()
    price: number

    @IsOptional()
    @IsNumber()
    oldPrice?: number
  
    @IsNumber()
    credit: number
  
    @IsString()
    description: string
  
    @IsString()
    advantages: string
  
    @IsString()
    disAdvantages: string

    @IsArray()
    @IsString({ each: true })
    categories: string[]

    @IsArray()
    @IsString({ each: true })
    tags: string[]

    @ValidateNested()
    @IsArray()
    @Type(() => ProductCharacteristicDto)
    characteristics: ProductCharacteristicDto[]
}