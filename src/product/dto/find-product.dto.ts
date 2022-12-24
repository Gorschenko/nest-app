import { IsNumber, IsString } from 'class-validator'

export class FindProdutDto {
  @IsString()
  category: string
  
  @IsNumber()
  limit: number
}