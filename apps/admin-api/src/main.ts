import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { useContainer } from 'class-validator'
import { PaginationDto, ResponseJson } from '@aiknew/shared-api-dtos'
import { ADMIN_API_PORT } from '@aiknew/shared-constants'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      skipMissingProperties: false,
      skipNullProperties: false,
      skipUndefinedProperties: false,
    }),
  )
  // app.enableCors()
  // swagger
  const config = new DocumentBuilder()
    .setTitle('Aiknew Admin Api')
    .setDescription('Aiknew-Admin API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .addGlobalResponse({
      status: 500,
      description: 'Internal server error',
      type: () => ResponseJson,
    })
    .build()
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [PaginationDto, ResponseJson],
  })
  SwaggerModule.setup('api-doc', app, document)
  // class-validator
  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  await app.listen(ADMIN_API_PORT)
}
bootstrap()
