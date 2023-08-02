import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { BotService } from '../services/bot.service';

@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService){}

  @EventPattern('message')
  async handleMessage(message: any) {
    const response = await this.botService.handleMessage(message);
  }
}
