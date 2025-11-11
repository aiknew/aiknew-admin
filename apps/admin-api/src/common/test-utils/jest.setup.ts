import { PrismaService } from "@aiknew/shared-admin-db"
import { type NestExpressApplication } from "@nestjs/platform-express"
import { I18nService } from "nestjs-i18n"
import { AppModule } from "../../app.module"
import { Test } from "@nestjs/testing"
import { setup } from "../../setup"
import { resetDB } from "./test-db"

let app: NestExpressApplication
let i18nService: I18nService
let prismaService: PrismaService

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()

  app = moduleRef.createNestApplication()
  setup(app)
  i18nService = moduleRef.get(I18nService)
  prismaService = moduleRef.get(PrismaService)

  global.app = app
  global.prismaService = prismaService
  global.i18nService = i18nService

  await app.init()
})

beforeEach(async () => {
  await resetDB(prismaService)
})

afterAll(async () => {
  await app.close()
})
