import { Injectable } from '@nestjs/common';
import { CreateAccessRequestStatusDto } from './dto/create-access-request-status.dto';
import { UpdateAccessRequestStatusDto } from './dto/update-access-request-status.dto';

@Injectable()
export class AccessRequestStatusService {
  create(createAccessRequestStatusDto: CreateAccessRequestStatusDto) {
    return 'This action adds a new accessRequestStatus';
  }

  findAll() {
    return `This action returns all accessRequestStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accessRequestStatus`;
  }

  update(id: number, updateAccessRequestStatusDto: UpdateAccessRequestStatusDto) {
    return `This action updates a #${id} accessRequestStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} accessRequestStatus`;
  }
}
