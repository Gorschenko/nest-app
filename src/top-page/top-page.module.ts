import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { TopPageController } from './top-page.controller';
import { TopPageService } from './top-page.service';

@Module({
  controllers: [TopPageController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: TopPageModule,
        schemaOptions: {
          collection: 'TopPage',
        }
      }
    ])
  ],
  providers: [TopPageService],
})
export class TopPageModule {}
