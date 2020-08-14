import { HttpStatus, HttpException } from '@nestjs/common'

export class INTERNAL_SERVER_ERROR extends HttpException {
  constructor() {
    super('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR)
  }
}
