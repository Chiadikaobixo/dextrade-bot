import { DocumentBuilder } from '@nestjs/swagger';

export const SwaggerConfig = new DocumentBuilder()
.setTitle('DexTrade')
.setDescription('DexTrade Bot server')
.setVersion('1.0')
.addTag('DexTrade')
.build();