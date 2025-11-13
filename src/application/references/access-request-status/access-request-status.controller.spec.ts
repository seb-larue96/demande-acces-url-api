import { Test, TestingModule } from '@nestjs/testing';
import { AccessRequestStatusController } from './access-request-status.controller';
import { AccessRequestStatusService } from './access-request-status.service';

describe('AccessRequestStatusController', () => {
  let controller: AccessRequestStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccessRequestStatusController],
      providers: [AccessRequestStatusService],
    }).compile();

    controller = module.get<AccessRequestStatusController>(AccessRequestStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
