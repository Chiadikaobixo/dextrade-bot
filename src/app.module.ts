import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getEnvironment } from './configs/env.configs';
import { BotModule } from './modules/core/bot/bot.modules';

@Module({
  imports: [
    BotModule,
    ConfigModule.forRoot({
      load: getEnvironment(),
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
