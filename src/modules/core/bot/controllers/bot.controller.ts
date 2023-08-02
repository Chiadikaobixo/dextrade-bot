import { Controller } from '@nestjs/common';
import { Message } from 'node-telegram-bot-api';

@Controller('bot')
export class BotController {
  // Implement your logic to handle incoming messages and interact with the wallet and DEX trade functionalities
  // You can use the @Message() decorator to capture incoming messages from the Telegram bot
}
