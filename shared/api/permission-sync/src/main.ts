import {
  DiscoveryService,
  MetadataScanner,
  NestFactory,
  Reflector,
} from "@nestjs/core"
import { AppModule } from "../../../../apps/admin-api/src/app.module"
import { I18nService } from "nestjs-i18n"
import { syncPermission } from "./sync"
import { adminBasePath } from "../../../../apps/admin-api/src/common/constants"

async function main() {
  const app = await NestFactory.create(AppModule)
  try {
    const discovery = app.get(DiscoveryService)
    const reflector = app.get(Reflector)
    const i18n: I18nService<Record<string, unknown>> = app.get(I18nService)
    const metadataScanner = app.get(MetadataScanner)

    await syncPermission({
      discovery,
      i18n,
      metadataScanner,
      reflector,
      adminBasePath,
    })
  } catch (err) {
    console.log("err: ", err)
  } finally {
    await app.close()
    process.exit(0)
  }
}

main().catch((err) => {
  console.error("sync error: ", err)
})
