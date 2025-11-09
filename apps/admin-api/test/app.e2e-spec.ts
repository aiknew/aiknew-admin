import { type NestExpressApplication } from "@nestjs/platform-express"
import { Test } from "@nestjs/testing"
import { AppModule } from "../src/app.module"
import { setup } from "../src/setup"
import request from "supertest"
import { SuccessResponse } from "@aiknew/shared-api-utils"
import { I18nService } from "nestjs-i18n"

describe("App e2e", () => {
  let app: NestExpressApplication
  let i18nService: I18nService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    setup(app)
    i18nService = moduleRef.get(I18nService)

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it("/ (GET)", () => {
    const msg = i18nService.translate("common.requestSuccess")
    const expectedResponse = new SuccessResponse(msg)
      .setData({ name: "test" })
      .getResponseJson()

    return request(app.getHttpServer())
      .get("/")
      .expect(200)
      .expect(expectedResponse)
  })
})
