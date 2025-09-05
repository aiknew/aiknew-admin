import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DiscoveryService, Reflector } from '@nestjs/core';
import * as fs from 'fs';
import * as path from 'path';
import { PERMISSION_KEY } from '@aiknew/shared-api-decorators';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const discovery = app.get(DiscoveryService);
  const reflector = app.get(Reflector);

  const controllers = discovery.getControllers();
  const results: any[] = [];

  for (const wrapper of controllers) {
    const { instance } = wrapper;
    if (!instance) continue;
    const prototype = Object.getPrototypeOf(instance);

    for (const methodName of Object.getOwnPropertyNames(prototype)) {
      if (methodName === 'constructor') continue;
      const method = prototype[methodName];
      const permission = reflector.get(PERMISSION_KEY, method);
      if (!permission) continue;


      // const routePath = Reflect.getMetadata(PATH_METADATA, method) || ''
      // const reqMethod = Reflect.getMetadata(METHOD_METADATA, method)
      const pathMetadata = reflector.get('path', method);
      const requestMethod = reflector.get('method', method);

      results.push({
        permissionKey: permission.key,
        summary: permission.summary,
        path: pathMetadata,
        httpMethod: requestMethod,
      });
    }
  }

  const outPath = path.resolve(process.cwd(), 'artifacts/permissions.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(`Wrote ${results.length} permissions to ${outPath}`);

  await app.close();
  process.exit(1)
}

bootstrap();
