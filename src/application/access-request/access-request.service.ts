import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccessRequestDto } from './dto/create-access-request.dto';
import { UpdateAccessRequestDto } from './dto/update-access-request.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { AccessRequest } from './entities/access-request.entity';
import { mapToAccessRequestResponseDto } from './mapping/access-request.mapper';
import { User } from '../users/entities/user.entity';
import { AccessRequestStatus } from '../references/access-request-status/entities/access-request-status.entity';
import { AccessRequestResponseDto } from './dto/access-request-response.dto';

@Injectable()
export class AccessRequestService {

  constructor(
    @InjectRepository(AccessRequest)
    private readonly accessRequestRepository: EntityRepository<AccessRequest>,
    private readonly em: EntityManager
  ) {}

  async create(user: User, createAccessRequestDto: CreateAccessRequestDto): Promise<AccessRequestResponseDto> {
    const requestStatus = await this.em.findOne(AccessRequestStatus, { code: 'Pending' });

    if (!requestStatus) throw new Error('Pending status not found');

    const requestNumber = await this.generateUniqueRequestNumber();

    const accessRequest = this.em.create(AccessRequest, {
      requestNumber: requestNumber,
      Url: createAccessRequestDto.url,
      requester: user,
      reasonToRequest: createAccessRequestDto.reasonToRequest,
      requestStatus: requestStatus,
      status: 'I',
      createdAt: new Date(),
    });

    await this.em.persistAndFlush(accessRequest);

    return mapToAccessRequestResponseDto(accessRequest);
  }

  async findAll(): Promise<AccessRequestResponseDto[]> {
    const acccesRequests = await this.accessRequestRepository.find(
      { status: { $ne: 'D' } },
      { populate: ['requester', 'requestStatus'] }
    );
    return acccesRequests.map(accessRequest => mapToAccessRequestResponseDto(accessRequest));
  }

  async findAllByUser(user: User): Promise<AccessRequestResponseDto[]> {
    const accessRequests = await this.accessRequestRepository.find(
      { requester: user.id, status: { $ne: 'D' } },
      { populate: ['requester', 'requestStatus'] }
    );
    return accessRequests.map(accessRequest => mapToAccessRequestResponseDto(accessRequest));
  }

  async findOne(id: number): Promise<AccessRequestResponseDto> {
    const accessRequest = await this.accessRequestRepository.findOne(
      { id, status: { $ne: 'D' } },
      { populate: ['requester', 'requestStatus'] }
    );

    if(!accessRequest) throw new NotFoundException(`Access request with id ${id} not found`);

    return mapToAccessRequestResponseDto(accessRequest);
  }

  update(id: number, updateAccessRequestDto: UpdateAccessRequestDto) {
    return `This action updates a #${id} accessRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} accessRequest`;
  }

  async approveRequest(requestId: number, approver: User): Promise<AccessRequestResponseDto> {
    const accessRequest = await this.accessRequestRepository.findOne(
      { id: requestId, status: { $ne: 'D' } },
      { populate: ['requester', 'requestStatus'] }
    );

    if (!accessRequest) throw new NotFoundException(`Access request ${requestId} not found`);

    if (accessRequest.requester.id === approver.id) throw new ForbiddenException('You cannot approve your own request');

    const approvedStatus = await this.em.findOne(AccessRequestStatus, { code: 'Approved' });
    if (!approvedStatus) throw new NotFoundException('Approved status not found');

    accessRequest.requestStatus = approvedStatus;
    accessRequest.handledBy = approver;
    accessRequest.status = 'M';

    await this.em.persistAndFlush(accessRequest);
    return mapToAccessRequestResponseDto(accessRequest);
  }

  async rejectRequest(requestId: number, approver: User, reason?: string) {
    const accessRequest = await this.accessRequestRepository.findOne(
      { id: requestId, status: { $ne: 'D' } },
      { populate: ['requester', 'requestStatus'] }
    );

    if (!accessRequest) throw new NotFoundException(`Access request ${requestId} not found`);

    if (accessRequest.requester.id === approver.id) throw new ForbiddenException('You cannot reject your own request');

    const rejectedStatus = await this.em.findOne(AccessRequestStatus, { code: 'Rejected' });
    if (!rejectedStatus) throw new NotFoundException('Rejected status not found');

    accessRequest.requestStatus = rejectedStatus;
    accessRequest.reasonToReject = reason || 'No reason provided';
    accessRequest.handledBy = approver;
    accessRequest.status = 'M';

    await this.em.persistAndFlush(accessRequest);
    return mapToAccessRequestResponseDto(accessRequest);
  }

  private async generateUniqueRequestNumber(): Promise<string> {
    while (true) {
      const now = new Date();
      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, '0');
      const d = String(now.getDate()).padStart(2, '0');
      const datePart = `${y}${m}${d}`;

      const random = Math.floor(Math.random() * 9000 + 1000);
      const requestNumber = `REQ-${datePart}-${random}`;

      const existing = await this.em.findOne(AccessRequest, { requestNumber });
      if (!existing) return requestNumber;
    }
  }

}
