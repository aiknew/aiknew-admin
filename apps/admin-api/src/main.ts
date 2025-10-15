import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { useContainer } from 'class-validator'
import { PaginationDto, ResponseJson } from '@aiknew/shared-api-dtos'
import { ADMIN_API_PORT } from '@aiknew/shared-constants'
import { type NestExpressApplication } from '@nestjs/platform-express'
import metadata from './metadata'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.disable('x-powered-by');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      skipMissingProperties: false,
      skipNullProperties: false,
      skipUndefinedProperties: false,
    }),
  )
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

  await SwaggerModule.loadPluginMetadata(metadata);
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [PaginationDto, ResponseJson],
  })
  SwaggerModule.setup('api-doc', app, document)
  // class-validator
  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  try {
    await app.listen(ADMIN_API_PORT, '0.0.0.0', () => {
      console.log('app is listening on port ' + ADMIN_API_PORT)
    })
  } catch (err) {
    console.error('err: ', err)
    process.exit(1)
  }
}
bootstrap()
