import { Injectable, Inject } from '@nestjs/common'
import { Model, Types } from 'mongoose'
import { IDeveloperDocument, IPaginationDevelopers } from '../model/interfaces/developer.interface'

@Injectable()
export class DeveloperRepository {
  constructor(
    @Inject('DEVELOPER_MODEL')
    private readonly developerModel: Model<IDeveloperDocument>,
  ) {}

  public async create(developer) {
    return this.developerModel.create(developer)
  }

  public async findById(developerId: Types.ObjectId) {
    return this.developerModel.findById(developerId)
  }

  public async delete(developerId: Types.ObjectId) {
    return this.developerModel.deleteOne({ _id: developerId })
  }

  public async findAll(payload: IPaginationDevelopers) {
    return this.developerModel
      .find(payload.filters)
      .skip(payload.skip)
      .limit(payload.take)
  }

  public async updateOne(developerId, updateData) {
    return this.developerModel.updateOne({ _id: developerId }, updateData, { new: true })
  }
}
