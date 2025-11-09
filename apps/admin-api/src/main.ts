import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { PaginationDto, ResponseJson } from "@aiknew/shared-api-dtos"
import { ADMIN_API_PORT } from "@aiknew/shared-constants"
import { type NestExpressApplication } from "@nestjs/platform-express"
import { setup } from "./setup"
// import metadata from "./metadata"

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  // setup
  setup(app)
  // disabled x-powered-by header
  app.disable("x-powered-by")
  // swagger
  const config = new DocumentBuilder()
    .setTitle("Aiknew Admin Api")
    .setDescription("Aiknew-Admin API description")
    .setVersion("1.0")
    .addBearerAuth()
    .addSecurityRequirements("bearer")
    .addGlobalResponse({
      status: 500,
      description: "Internal server error",
      type: () => ResponseJson,
    })
    .build()

  // await SwaggerModule.loadPluginMetadata(metadata)
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [PaginationDto, ResponseJson],
  })
  SwaggerModule.setup("api-doc", app, document)

  try {
    await app.listen(ADMIN_API_PORT, "0.0.0.0", () => {
      console.log("app is listening on port " + ADMIN_API_PORT)
    })
  } catch (err) {
    console.error("err: ", err)
    process.exit(1)
  }
}

bootstrap().catch((err) => {
  console.error("Bootstrap error:", err)
  process.exit(1)
})
