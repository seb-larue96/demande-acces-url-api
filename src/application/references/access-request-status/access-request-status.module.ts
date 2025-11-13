import { Module } from '@nestjs/common';
import { AccessRequestStatusService } from './access-request-status.service';
import { AccessRequestStatusController } from './access-request-status.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    MikroOrmModule.forFeature(['AccessRequestStatus'])
  ],
  controllers: [AccessRequestStatusController],
  providers: [AccessRequestStatusService],
})
export class AccessRequestStatusModule {}
