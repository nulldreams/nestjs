import { Module } from '@nestjs/common'
import { AppController } from './controller/app.controller'
import { AppService } from './service/app.service'
import { DeveloperModule } from 'src/modules/developer/developer.module'
@Module({
  imports: [DeveloperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
