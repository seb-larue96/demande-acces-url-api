import { Module } from '@nestjs/common';
import { AccessRequestStatusService } from './access-request-status.service';
import { AccessRequestStatusController } from './access-request-status.controller';

@Module({
  controllers: [AccessRequestStatusController],
  providers: [AccessRequestStatusService],
})
export class AccessRequestStatusModule {}
