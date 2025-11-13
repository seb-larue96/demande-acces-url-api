import { PartialType } from '@nestjs/mapped-types';
import { CreateAccessRequestStatusDto } from './create-access-request-status.dto';

export class UpdateAccessRequestStatusDto extends PartialType(CreateAccessRequestStatusDto) {}
