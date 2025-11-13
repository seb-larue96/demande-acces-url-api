import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';
import { AccessRequestStatus } from './entities/access-request-status.entity';
import { AccessRequestStatusResponseDto } from './dto/access-request-status-response.dto';
import { mapToAccessRequestStatusResponseDto } from './mapping/access-request-status.mapper';

@Injectable()
export class AccessRequestStatusService {

  constructor(
  @InjectRepository(AccessRequestStatus)
  private readonly accessRequestStatusRepository: EntityRepository<AccessRequestStatus>,
  ) {}

  async findAll(): Promise<AccessRequestStatusResponseDto[]> {
    const accessRequestStatuses = await this.accessRequestStatusRepository.find({ status: { $ne: 'D' } });
    return accessRequestStatuses.map(accessRequestStatus => mapToAccessRequestStatusResponseDto(accessRequestStatus));
  }

  async findOne(id: number): Promise<AccessRequestStatusResponseDto> {
    const accessRequestStatus = await this.accessRequestStatusRepository.findOne({ id, status: { $ne: 'D' } });

    if (!accessRequestStatus) throw new NotFoundException(`AccessRequestStatus with id ${id} not found`);

    return mapToAccessRequestStatusResponseDto(accessRequestStatus);
  }
}
