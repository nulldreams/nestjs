import { HttpStatus, HttpException } from '@nestjs/common'
import { MESSAGES } from './mapper.errors'

export class DEVELOPER_NOT_FOUND extends HttpException {
  constructor() {
    super(MESSAGES.DEVELOPER_NOT_FOUND, HttpStatus.INTERNAL_SERVER_ERROR)
  }
}
