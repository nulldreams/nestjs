import { Document } from 'mongoose'

export interface IDeveloper {
  name: string
  sex: SexTypes
  age: number
  hobby: string
  birthdate: Date
}

export enum SexTypes {
  MALE = 'male',
  FEMALE = 'female',
}

export interface IPaginationDevelopers {
  filters: object
  take: number
  skip: number
}

export interface IDeveloperDocument extends IDeveloper, Document {}
