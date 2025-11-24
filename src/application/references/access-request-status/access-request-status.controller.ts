import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AccessRequestStatusService } from './access-request-status.service';

@ApiTags('access-request-statuses')
@Controller('access-request-status')
export class AccessRequestStatusController {
  constructor(private readonly accessRequestStatusService: AccessRequestStatusService) {}

  @Get('getAccessRequestStatuses')
  @ApiOperation({ summary: 'Get all access request statuses' })
  @ApiResponse({ status: 200, description: 'List of all access request statuses.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll() {
    return this.accessRequestStatusService.findAll();
  }

  @Get('getAccessRequestStatusById:id')
  @ApiOperation({ summary: 'Get access request status by id' })
  @ApiResponse({ status: 200, description: 'The access request status has been successfully retrieved.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Access request status not found.' })
  async findOne(@Param('id') id: number) {
    return this.accessRequestStatusService.findOne(id);
  }
}
