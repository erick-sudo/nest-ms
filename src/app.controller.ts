import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  NatsContext,
  Payload,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'sum' })
  accumulate(data: number[]): number {
    console.log('Message: ', data);
    return (data || []).reduce((a, b) => a + b);
  }

  @EventPattern('user_created')
  async handleUSerCreaated(
    @Payload() data: number[],
    @Ctx() context: NatsContext,
  ) {
    console.log(`Subject: ${context.getSubject()}`); // e.g. "time.us.east"
    return new Date().toLocaleTimeString();
  }
}
