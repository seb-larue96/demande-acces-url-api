import { Module } from '@nestjs/common';
import { AccessRequestService } from './access-request.service';
import { AccessRequestController } from './access-request.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    MikroOrmModule.forFeature(['AccessRequest'])
  ],
  controllers: [AccessRequestController],
  providers: [AccessRequestService],
})
export class AccessRequestModule {}
