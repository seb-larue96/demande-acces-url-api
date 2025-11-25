import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessRequestService } from './access-request.service';
import { CreateAccessRequestDto } from './dto/create-access-request.dto';
import { UpdateAccessRequestDto } from './dto/update-access-request.dto';
import { User as UserEntity } from '../users/entities/user.entity';
import { User } from 'src/decorators/user.decorator';

@ApiTags('access-request')
@Controller('access-request')
export class AccessRequestController {
  constructor(private readonly accessRequestService: AccessRequestService) {}

  @Post('createAccessRequest')
  @ApiOperation({ summary: 'Create a new access request' })
  @ApiResponse({ status: 201, description: 'The access request has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@User() user: UserEntity, @Body() createAccessRequestDto: CreateAccessRequestDto) {
    return this.accessRequestService.create(user, createAccessRequestDto);
  }

  @Get('getAccessRequests')
  @ApiOperation({ summary: 'Get all access requests' })
  @ApiResponse({ status: 200, description: 'List of all access requests.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll() {
    return this.accessRequestService.findAll();
  }

  @Get('getAccessRequestsByUser')
  @ApiOperation({ summary: 'Get all access requests by requester' })
  @ApiResponse({ status: 200, description: 'List of all access requests for a user' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAllByUserId(@User() user: UserEntity,) {
    return this.accessRequestService.findAllByUser(user);
  }

  @Get('getAccessRequestById:id')
  @ApiOperation({ summary: 'Get access request by id' })
  @ApiParam({ name: 'id', type: Number, description: 'The id of the access request to retrieve.' })
  @ApiResponse({ status: 200, description: 'The access request has been successfully retrieved.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Access request not found.' })
  findOne(@Param('id') id: number) {
    return this.accessRequestService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccessRequestDto: UpdateAccessRequestDto) {
    return this.accessRequestService.update(+id, updateAccessRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accessRequestService.remove(+id);
  }
}
