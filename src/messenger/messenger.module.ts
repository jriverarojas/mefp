import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { RedisService } from './services/redis.service';
import { QueueController } from './controllers/queue.controller';
import { WorkerService } from './services/worker.service';


@Module({
  imports: [
    ConfigModule
  ],
  providers: [RedisService, WorkerService],
  controllers: [QueueController]
  
})
export class MessengerModule {}
