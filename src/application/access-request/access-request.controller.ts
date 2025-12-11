import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Headers, ForbiddenException } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessRequestService } from './access-request.service';
import { CreateAccessRequestDto } from './dto/create-access-request.dto';
import { UpdateAccessRequestDto } from './dto/update-access-request.dto';
import { User as UserEntity } from '../users/entities/user.entity';
import { User } from 'src/decorators/user.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { RejectAccessRequestDto } from './dto/reject-access-request.dto';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('access-request')
@Controller('access-request')
export class AccessRequestController {
  constructor(private readonly accessRequestService: AccessRequestService) {}

  @Roles('User')
  @Post('createAccessRequest')
  @ApiOperation({ summary: 'Create a new access request' })
  @ApiResponse({ status: 201, description: 'The access request has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@User() user: UserEntity, @Body() createAccessRequestDto: CreateAccessRequestDto) {
    return this.accessRequestService.create(user, createAccessRequestDto);
  }

  @Roles('Admin')
  @Get('getAccessRequests')
  @ApiOperation({ summary: 'Get all access requests' })
  @ApiResponse({ status: 200, description: 'List of all access requests.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll() {
    return this.accessRequestService.findAll();
  }

  @Public()
  @Get('getAccessRequestsPending')
  @ApiOperation({ summary: 'Get all pending access requests' })
  @ApiResponse({ status: 200, description: 'List of all pending access requests' })
  findAllPending(@Headers('auth') auth: string) {
    const expectedHeader = process.env.PA_AUTH_HEADER;

    if (auth !== expectedHeader) {
      throw new ForbiddenException('Invalid source');
    }

    return this.accessRequestService.findAllPending();
  }

  @Roles('User')
  @Get('getAccessRequestsByUser')
  @ApiOperation({ summary: 'Get all access requests by requester' })
  @ApiResponse({ status: 200, description: 'List of all access requests for a user' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAllByUserId(@User() user: UserEntity) {
    return this.accessRequestService.findAllByUser(user);
  }

  @Roles('Guest')
  @Get('getAccessRequestById/:id')
  @ApiOperation({ summary: 'Get access request by id' })
  @ApiParam({ name: 'id', type: Number, description: 'The id of the access request to retrieve.' })
  @ApiResponse({ status: 200, description: 'The access request has been successfully retrieved.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Access request not found.' })
  findOne(@Param('id') id: number) {
    return this.accessRequestService.findOne(id);
  }

  @Roles('User')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccessRequestDto: UpdateAccessRequestDto) {
    return this.accessRequestService.update(+id, updateAccessRequestDto);
  }

  @Roles('User')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accessRequestService.remove(+id);
  }

  @Roles('Admin')
  @Post('approve/:id')
  @ApiOperation({ summary: 'Approve an access request' })
  @ApiParam({ name: 'id', type: Number, description: 'The id of the request to be approved' })
  @ApiResponse({ status: 200, description: 'The access request has been approved.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Access request not found.' })
  async approveOne(@Param('id') id: number, @Req() req) {
    return this.accessRequestService.approveRequest(id, req.user);
  }

  @Roles('Admin')
  @Post('reject/:id')
  @ApiOperation({ summary: 'Reject an access request' })
  @ApiParam({ name: 'id', type: Number, description: 'The id of the request to be rejected' })
  @ApiResponse({ status: 200, description: 'The access request has been rejected.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Access request not found.' })
  async rejectOne(@Param('id') id: number, @Body() rejectAccessRequestDto: RejectAccessRequestDto, @Req() req) {
    return this.accessRequestService.rejectRequest(id, req.user, rejectAccessRequestDto.reason);
  }
}
