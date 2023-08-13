import { Module } from '@nestjs/common';
import { TokenService } from './services/token.service';

@Module({
  imports: [],
  controllers: [],
  providers: [TokenService],
})
export class TokenModule {}
