import { Module } from '@nestjs/common';
import { BotController } from './controllers/bot.controller';
import { BotService } from './services/bot.service';

@Module({
  imports: [],
  controllers: [BotController],
  providers: [BotService],
})
export class BotModule {}
