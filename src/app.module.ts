import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotModule } from './modules/core/bot/bot.modules';

@Module({
  imports: [BotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
