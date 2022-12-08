import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import configuration from "./config/configuration";

async function main() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders:"*",
    origin: "*"
  });
  await app.listen(configuration().port);
}
main();
