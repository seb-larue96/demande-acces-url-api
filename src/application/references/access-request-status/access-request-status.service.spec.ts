import { Test, TestingModule } from '@nestjs/testing';
import { AccessRequestStatusService } from './access-request-status.service';

describe('AccessRequestStatusService', () => {
  let service: AccessRequestStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessRequestStatusService],
    }).compile();

    service = module.get<AccessRequestStatusService>(AccessRequestStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
