import { type INestApplication } from "@nestjs/common"
import { ValidationPipe } from "@nestjs/common"
import { AppModule } from "./app.module"
import { useContainer } from "class-validator"

export const setup = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      skipMissingProperties: false,
      skipNullProperties: false,
      skipUndefinedProperties: false,
    }),
  )

  // class-validator
  useContainer(app.select(AppModule), { fallbackOnErrors: true })
}
