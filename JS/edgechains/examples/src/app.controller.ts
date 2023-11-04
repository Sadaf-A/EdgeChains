import {
  Controller,
  Get,
  Post,
  Render,
  Request,
  Response,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   hydeSearchAdaEmbedding('hello');
  //   return this.appService.getHello();
  // }

  // @Post('/hyde-search/query-rrf')
  // @HttpCode(200)
  // hydeSearch(@Query() params: any, @Body() query: any) {
  //   const arkRequest = {
  //     topK: params.topK,
  //     metadataTable: query.metadataTable,
  //     query: query.query,
  //     textWeight: query.textWeight,
  //     similarityWeight: query.similarityWeight,
  //     dateWeight: query.dateWeight,
  //     orderRRF: query.orderRRF,
  //   };
  //   return hydeSearchAdaEmbedding(arkRequest);
  // }

  @Get('fragments')
  @Render('fragments')
  async fragments() {
    const items = (await this.appService.getItems()).data;
    return {
      messageItem: [
        { item: { message: 'Message 1' } },
        { item: { message: 'Message 2' } },
      ],
      chatItem: items,
    };
  }

  @Get('index')
  @Render('index')
  index() {}

  @Get('chat-data')
  async getChats() {
    const items = await this.appService.getItems();
    console.log(items);
    const heading = items.data[0].heading;
    const chatMessageHTML = `<li>${heading}</li>`;

    // Return the HTML structure
    return `
      <ul class="list-unstyled mb-0">
        ${chatMessageHTML}
      </ul>
    `;
  }
  catch(error) {
    throw error;
  }

  @Post('/items')
  async createItem(@Request() req, @Response() res) {
    const item = await this.appService.createItem(req.body.name);
    console.log(item);
    res.redirect('/items');
  }
}
