import { PluginMetadataGenerator } from '@nestjs/cli/lib/compiler/plugins/plugin-metadata-generator';
import { ReadonlyVisitor } from '@nestjs/swagger/dist/plugin';

const generator = new PluginMetadataGenerator();
generator.generate({
  visitors: [new ReadonlyVisitor({
    introspectComments: true, pathToSource: __dirname,
    esmCompatible: true
  })],
  outputDir: __dirname,
  watch: true,
  tsconfigPath: './tsconfig.json',
});
