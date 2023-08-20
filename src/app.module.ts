import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvironment } from './configs/env.configs';
import { BotModule } from './modules/core/bot/bot.modules';
import { WalletModule } from './modules/core/wallet/wallet.module';
import { UserModule } from './modules/core/user/user.module';
import { TokenModule } from './modules/core/token/token.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    BotModule,
    WalletModule,
    UserModule,
    TokenModule,
    ConfigModule.forRoot({
      load: getEnvironment(),
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('database.connectionstring'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
