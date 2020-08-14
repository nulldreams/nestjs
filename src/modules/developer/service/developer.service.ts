import { Injectable } from '@nestjs/common'
import { DeveloperRepository } from '../repository/developer.repository'
import {
  CreateDeveloperDTO,
  QueryDevelopersDTO,
  UpdateDeveloperDTO,
  DefaultResponseDTO,
  ResponseCreateDeveloperDTO,
} from '../dto/developer.dto'
import * as moment from 'moment'
import { Types } from 'mongoose'
import { DEVELOPER_NOT_FOUND } from '../errors/developer.errors'
import { to } from 'src/utils/errors/await-to-js'
import { INTERNAL_SERVER_ERROR } from 'src/utils/errors/api.errors'

@Injectable()
export class DeveloperService {
  constructor(private readonly developerRepository: DeveloperRepository) {}

  public async create(developer: CreateDeveloperDTO): Promise<ResponseCreateDeveloperDTO> {
    const ageByBirthdate = birthdate => moment().diff(birthdate, 'years')
    if (!developer.age) developer.age = ageByBirthdate(developer.birthdate)

    const [err, createdDeveloper] = await to(this.developerRepository.create(developer))
    if (err) throw new INTERNAL_SERVER_ERROR()

    return this.defaultResponse(true, createdDeveloper)
  }

  public async findById(developerId: Types.ObjectId): Promise<DefaultResponseDTO> {
    const [err, developerExists] = await to(this.developerRepository.findById(developerId))
    if (err || !developerExists) throw new DEVELOPER_NOT_FOUND()

    return this.defaultResponse(true, developerExists)
  }

  public async findAll(queryDevelopers: QueryDevelopersDTO): Promise<DefaultResponseDTO> {
    const { page, per_page, ...filters } = queryDevelopers
    const [err, developers] = await to(
      this.developerRepository.findAll({
        filters,
        take: parseInt(per_page),
        skip: parseInt(per_page) * (parseInt(page) - 1),
      }),
    )
    if (err) throw new DEVELOPER_NOT_FOUND()

    return this.defaultResponse(true, developers)
  }

  public async update(developerId: Types.ObjectId, developer: UpdateDeveloperDTO): Promise<DefaultResponseDTO> {
    const developerExists = await this.findById(developerId)
    if (!developerExists) throw new DEVELOPER_NOT_FOUND()

    const ageByBirthdate = birthdate => moment().diff(birthdate, 'years')
    if (!developer.age) developer.age = ageByBirthdate(developer.birthdate)

    const [err] = await to(this.developerRepository.updateOne(developerId, developer))
    if (err) throw new INTERNAL_SERVER_ERROR()

    return this.defaultResponse(true, { message: 'DEVELOPER_UPDATED' })
  }

  public async delete(developerId: Types.ObjectId): Promise<DefaultResponseDTO> {
    const developerExists = await this.findById(developerId)
    if (!developerExists) throw new DEVELOPER_NOT_FOUND()

    const [err] = await to(this.developerRepository.delete(developerId))
    if (err) throw new INTERNAL_SERVER_ERROR()

    return this.defaultResponse(true, { message: 'DEVELOPER_REMOVED' })
  }

  private defaultResponse(success: boolean, data: any) {
    return { success, data }
  }
}
