import { type LoggerService } from "@nestjs/common"
import { WinstonModule, type WinstonModuleOptions } from "nest-winston"
import * as winston from "winston"
import "winston-daily-rotate-file"

let loggerOptions: WinstonModuleOptions
switch (process.env.NODE_ENV) {
  case "development":
    loggerOptions = {
      exitOnError: false,
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple(),
      ),
      transports: [
        new winston.transports.Console({
          handleExceptions: true,
          handleRejections: true,
        }),
      ],
    }
    break

  default:
    loggerOptions = {
      level: "warn",
      exitOnError: false,
      transports: [
        new winston.transports.DailyRotateFile({
          filename: "./logs/error-%DATE%.log",
          datePattern: "YYYY-MM-DD-HH",
          zippedArchive: true,
          maxSize: "20m",
          maxFiles: "14d",
          handleExceptions: true,
          handleRejections: true,
        }),
      ],
    }
    break
}

export const logger: LoggerService = WinstonModule.createLogger(loggerOptions)
