import { Body, Controller, Param } from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator';
import { Delete, Get, Patch, Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { FindProdutDto } from './dto/find-product.dto';
import { ProductModel } from './product.model/product.model';

@Controller('product')
export class ProductController {

  @Post('create')
  async create(@Body() dto: Omit<ProductModel, '_id'>) {

  }

  @Get(':id')
  async get(@Param('id') id: string) {

  }

  @Delete(':id')
  async delete(@Param('id') id: string) {

  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: ProductModel) {

  }

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindProdutDto) {

  }
}
