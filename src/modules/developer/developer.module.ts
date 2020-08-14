import { Module } from '@nestjs/common'
import { DeveloperController } from './controller/developer.controller'
import { DeveloperService } from './service/developer.service'
import { DatabaseModule } from '../database/database.module'
import { DeveloperRepository } from './repository/developer.repository'
import { developerProvider } from './model/developer.provider'

@Module({
  imports: [DatabaseModule],
  controllers: [DeveloperController],
  providers: [DeveloperService, DeveloperRepository, ...developerProvider],
  exports: [DeveloperService, DeveloperRepository, ...developerProvider],
})
export class DeveloperModule {}
