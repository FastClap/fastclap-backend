import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });

  const configService = app.get(ConfigService);

  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('FastClap API')
    .setDescription('Welcome to the FastClap API Documentation')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = +configService.get<number>('APP_PORT');
  const host = configService.get('APP_HOST');
  await app.listen(port, () => {
    console.log(`Listening at ${host}:${port}`);
  });
}

bootstrap().then(() => console.log('FastClap App started !'));
