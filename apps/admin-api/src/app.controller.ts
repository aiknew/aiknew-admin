import { Public } from "@aiknew/shared-api-decorators"
import { Controller, Get } from "@nestjs/common"

@Controller()
export class AppController {
  @Public()
  @Get()
  test() {
    return {
      name: "test",
    }
  }
}
