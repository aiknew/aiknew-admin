import { ApiProperty } from "@nestjs/swagger"
import { Algorithm, Challenge } from "altcha-lib/types"

export class AltchaChallengeDto implements Challenge {
  @ApiProperty({
    enumName: "AltchaAlgorithm",
    enum: ["SHA-1", "SHA-256", "SHA-512"],
  })
  algorithm: Algorithm

  challenge: string

  maxnumber?: number

  salt: string

  signature: string
}
