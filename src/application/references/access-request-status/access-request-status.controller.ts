import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccessRequestStatusService } from './access-request-status.service';
import { CreateAccessRequestStatusDto } from './dto/create-access-request-status.dto';
import { UpdateAccessRequestStatusDto } from './dto/update-access-request-status.dto';

@Controller('access-request-status')
export class AccessRequestStatusController {
  constructor(private readonly accessRequestStatusService: AccessRequestStatusService) {}

  @Post()
  create(@Body() createAccessRequestStatusDto: CreateAccessRequestStatusDto) {
    return this.accessRequestStatusService.create(createAccessRequestStatusDto);
  }

  @Get()
  findAll() {
    return this.accessRequestStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accessRequestStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccessRequestStatusDto: UpdateAccessRequestStatusDto) {
    return this.accessRequestStatusService.update(+id, updateAccessRequestStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accessRequestStatusService.remove(+id);
  }
}
