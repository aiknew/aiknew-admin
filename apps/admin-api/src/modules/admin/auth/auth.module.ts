import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { AdminUserModule } from "../admin-user/admin-user.module"
import { JwtModule } from "@nestjs/jwt"
import { ConfigService } from "@nestjs/config"
import { LoginLogModule } from "../login-log/login-log.module"

@Module({
  imports: [
    AdminUserModule,
    LoginLogModule,
    JwtModule.registerAsync({
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get("ADMIN_USER_JWT_SECRET"),
          signOptions: { expiresIn: "1d" },
        }
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
