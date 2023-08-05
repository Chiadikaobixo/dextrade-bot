import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvironment } from './configs/env.configs';
import { BotModule } from './modules/core/bot/bot.modules';
import { WalletModule } from './modules/core/wallet/wallet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/core/user/user.module';

@Module({
  imports: [
    BotModule,
    WalletModule,
    UserModule,
    ConfigModule.forRoot({
      load: getEnvironment(),
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('postgres.host'),
        port: configService.get('postgres.port'),
        username: configService.get('postgres.username'),
        password: configService.get('postgres.password'),
        database: configService.get('postgres.database'),
        entities: [__dirname + '/../**/*.entity.(js,ts)'],
        synchronize: true,
        logging: true,
        migrationsRun: true,
        autoLoadEntities: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
