import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import config from './config'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { INestApplication, ValidationPipe } from '@nestjs/common'

const generateSwaggerDoc = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Developer Crud')
    .setDescription('Developer Crud API Documentation')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('docs', app, document)
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  })

  app.setGlobalPrefix('/v1')

  app.useGlobalPipes(new ValidationPipe())

  generateSwaggerDoc(app)

  await app.listen(config.port)
}

bootstrap()
