import { PrismaService } from "@aiknew/shared-admin-db";
import { Injectable, } from "@nestjs/common";
import { DiscoveryService, MetadataScanner, Reflector } from "@nestjs/core";
import { I18nService } from "nestjs-i18n";
import { adminBasePath } from "../../../common/constants";
import { syncPermission } from '@aiknew/shared-api-permission-sync'


@Injectable()
export class PermissionSyncService {
  constructor(private readonly prisma: PrismaService,
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector,
    private readonly metadataScanner: MetadataScanner,
    private readonly i18nService: I18nService

  ) { }

  async sync() {
    await syncPermission({ adminBasePath, discovery: this.discoveryService, i18n: this.i18nService, metadataScanner: this.metadataScanner, prisma: this.prisma, reflector: this.reflector })
  }

}