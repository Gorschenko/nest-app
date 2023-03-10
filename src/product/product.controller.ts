import {
  Body,
  Controller,
  NotFoundException,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator';
import { Delete, Get, Patch, Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IdValidationPipe } from 'src/pipes/add-validation.pipe';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProdutDto } from './dto/find-product.dto';
import { PRODUCT_NOT_FOUND_ERROR } from './product.constants';
import { ProductModel } from './product.model';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor (private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto)
  }

  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const product = await this.productService.findById(id)
    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
    }
    return product
  }
  
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deleteProduct = await this.productService.deleteById(id)
    if (!deleteProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: ProductModel) {
    const updateProduct = await this.productService.updateById(id, dto)
    if (!updateProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
    }
    return updateProduct
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindProdutDto) {
    return this.productService.findWidthReviews(dto)
  }
}
