import { IsNotEmpty, IsString, IsDate, IsNumber, IsEnum, IsOptional, IsBoolean } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import * as moment from 'moment'
import { Transform } from 'class-transformer'
import { SexTypes, IDeveloper } from '../model/interfaces/developer.interface'
import { Types } from 'mongoose'

export class CreateDeveloperDTO {
  @ApiProperty({
    maxLength: 100,
    minLength: 2,
  })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  age: number

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(SexTypes)
  sex: string

  @ApiProperty({
    maxLength: 100,
    minLength: 2,
  })
  @IsNotEmpty()
  @IsString()
  hobby: string

  @ApiProperty()
  @Transform(birthdate => moment(birthdate).format('YYYY-MM-DD'))
  birthdate: Date
}

export class UpdateDeveloperDTO extends CreateDeveloperDTO {}

export class QueryDevelopersDTO {
  @ApiProperty({
    maxLength: 100,
    minLength: 2,
  })
  @IsOptional()
  @IsString()
  name: string

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  age: number

  @ApiProperty()
  @IsOptional()
  @IsEnum(SexTypes)
  sex: string

  @ApiProperty({
    maxLength: 100,
    minLength: 2,
  })
  @IsOptional()
  @IsString()
  hobby: string

  @ApiProperty()
  @Transform(birthdate => moment(birthdate).format('YYYY-MM-DD'))
  birthdate: Date

  @ApiProperty()
  @IsString()
  @IsOptional()
  page: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  per_page: string
}

export class DefaultResponseDTO {
  @ApiProperty()
  @IsBoolean()
  success: boolean
}

class DeveloperDTO extends CreateDeveloperDTO {
  @ApiProperty()
  @IsString()
  _id: string
}

export class ResponseCreateDeveloperDTO extends DefaultResponseDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  data: DeveloperDTO
}
