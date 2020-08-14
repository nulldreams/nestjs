import { Controller, Post, HttpCode, Body, Get, Param, Query, Put, Delete } from '@nestjs/common'
import { DeveloperService } from '../service/developer.service'
import {
  CreateDeveloperDTO,
  QueryDevelopersDTO,
  UpdateDeveloperDTO,
  ResponseCreateDeveloperDTO,
} from '../dto/developer.dto'
import { Types } from 'mongoose'
import { ApiHeader, ApiTags, ApiCreatedResponse } from '@nestjs/swagger'

@ApiHeader({
  name: 'Authorization',
  description: 'JWT Token',
})
@ApiTags('Developers')
@Controller('developers')
export class DeveloperController {
  constructor(private readonly developerService: DeveloperService) {}

  @Post()
  @ApiCreatedResponse({
    type: ResponseCreateDeveloperDTO,
  })
  @HttpCode(200)
  public async create(@Body() developer: CreateDeveloperDTO) {
    return this.developerService.create(developer)
  }

  @Get('paginated')
  @HttpCode(200)
  public async findAll(@Query() filters: QueryDevelopersDTO) {
    return this.developerService.findAll(filters)
  }

  @Get(':developer_id')
  @HttpCode(200)
  public async findById(@Param('developer_id') developerId: Types.ObjectId) {
    return this.developerService.findById(developerId)
  }

  @Put(':developer_id')
  @HttpCode(200)
  public async update(@Param('developer_id') developerId: Types.ObjectId, @Body() developer: UpdateDeveloperDTO) {
    return this.developerService.update(developerId, developer)
  }

  @Delete(':developer_id')
  @HttpCode(200)
  public async delete(@Param('developer_id') developerId: Types.ObjectId) {
    return this.developerService.delete(developerId)
  }
}
