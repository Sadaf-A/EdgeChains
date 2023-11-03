import {
  Body,
  Controller,
  Get,
  Render,
  HttpCode,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { hydeSearchAdaEmbedding } from './hydeExample/hydeExample';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    hydeSearchAdaEmbedding('hello');
    return this.appService.getHello();
  }

  @Post('/hyde-search/query-rrf')
  @HttpCode(200)
  hydeSearch(@Query() params: any, @Body() query: any) {
    const arkRequest = {
      topK: params.topK,
      metadataTable: query.metadataTable,
      query: query.query,
      textWeight: query.textWeight,
      similarityWeight: query.similarityWeight,
      dateWeight: query.dateWeight,
      orderRRF: query.orderRRF,
    };
    return hydeSearchAdaEmbedding(arkRequest);
  }

  @Get('fragments')
  @Render('fragments')
  fragments() {
    return {
      messageItem: [
        { item: { message: 'Message 1' } },
        { item: { message: 'Message 2' } },
      ],
      chatItem: [
        { chat: { heading: 'Chat 1' } },
        { chat: { heading: 'Chat 2' } },
      ],
    };
  }

  @Get('index')
  @Render('index')
  index() {
    return {
      chats: [{ chat: { heading: 'Chat 1' } }, { chat: { heading: 'Chat 2' } }],
      messages: [
        { item: { message: 'Message 1' } },
        { item: { message: 'Message 2' } },
      ],
    };
  }
}
