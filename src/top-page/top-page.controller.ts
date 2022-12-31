import { Body, Controller, NotFoundException, Param, UseGuards, UsePipes } from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator';
import { Delete, Get, Patch, Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { HhService } from 'src/hh/hh.service';
import { IdValidationPipe } from 'src/pipes/add-validation.pipe';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TOP_PAGE_NOT_FOUND_ERROR } from './top-page.constants';
import { TopPageModel } from './top-page.model';
import { TopPageService } from './top-page.service';

@Controller('top-page')
export class TopPageController {
  constructor(
    private readonly topPageService: TopPageService,
    private readonly hhService: HhService,
  ) {}
  
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateTopPageDto) {
    return this.topPageService.create(dto)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const page = await this.topPageService.findById(id)
    if (!page) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR)
    }
    return page
  }

  @Get('byAlias/:alias')
  async getByAlias(@Param('alias') alias: string) {
    const page = await this.topPageService.findByAlias(alias)
    if (!page) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR)
    }
    return page
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id' , IdValidationPipe) id: string) {
    const deletedPage = await this.topPageService.deleteById(id)
    if (!deletedPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patch(@Param('id' , IdValidationPipe) id: string, @Body() dto: CreateTopPageDto) {
    const updatedProduct = await this.topPageService.updateById(id, dto)
    if (!updatedProduct) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR)
    }
    return updatedProduct
  }

  @UsePipes(new IdValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindTopPageDto) {
    return this.topPageService.findByCategory(dto.firstCategory)
  }

  @Get('textSearch/:text')
  async textSearch(@Param('id' ) text: string) {
    return this.topPageService.findByText(text)
  }

  @Post('test')
  async test() {
    const data = await this.topPageService.findFOrHhUpdate(new Date())
    for (const page of data) {
      const hhData = await this.hhService.getData(page.category)
      page.hh = hhData
      await this.sleep(1000)
      await this.topPageService.updateById(page._id, page)
    }
  }

  async sleep (ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}
