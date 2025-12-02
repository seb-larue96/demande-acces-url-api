import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get('getRoles')
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({ status: 200, description: 'List of all roles.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll() {
    return this.rolesService.findAll();
  }

  @Get('getRoleById/:id')
  @ApiOperation({ summary: 'Get role by id' })
  @ApiResponse({ status: 200, description: 'The role status has been successfully retrieved.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Role not found.' })
  async findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }
}
