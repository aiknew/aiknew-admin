import { type NestExpressApplication } from "@nestjs/platform-express"
import request from "supertest"
import { resetDB, ResponseJsonType } from "../../../../common/test-utils"
import { PrismaService } from "@aiknew/shared-admin-db"
import { LoginSuccessDto } from "../dto"
import { I18nService } from "nestjs-i18n"

describe("auth e2e", () => {
  let app: NestExpressApplication
  let prismaService: PrismaService
  let i18nService: I18nService

  beforeAll(() => {
    app = global.app
    prismaService = app.get(PrismaService)
    i18nService = app.get(I18nService)
  })

  beforeEach(async () => {
    await resetDB(prismaService)
  })

  it("POST /admin/auth/login Login successfully", async () => {
    const loginCredentials = {
      userName: "super",
      password: "super",
    }

    const response = await request(app.getHttpServer())
      .post("/admin/auth/login")
      .send(loginCredentials)

    expect(response.body).toHaveProperty("code")
    expect(response.body).toHaveProperty("msg")

    const responseBody = response.body as ResponseJsonType<
      typeof LoginSuccessDto
    >

    expect(responseBody.code).toBe(0)
    expect(responseBody.msg).toBe(i18nService.t("admin-auth.loginSuccess"))
    expect(responseBody.data).toBeDefined()

    if (responseBody.data) {
      expect(responseBody.data).toHaveProperty("userInfo")
      expect(responseBody.data).toHaveProperty("access_token")
      expect(typeof responseBody.data.access_token).toBe("string")
    }
  })

  it("POST /admin/auth/login with invalid credentials", async () => {
    const invalidCredentials = {
      userName: "test",
      password: "test",
    }
    await request(app.getHttpServer())
      .post("/admin/auth/login")
      .send(invalidCredentials)
      .expect(401)
  })
})
