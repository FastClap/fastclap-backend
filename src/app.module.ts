import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MulterModule } from '@nestjs/platform-express';

import { FileUploadController } from "./file/file.upload.controller";
import { FileUploadService } from "./file/file.upload.service";

import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration'

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration],
  }),
    MulterModule.register({
    dest: './files',
  })],
  controllers: [AppController, FileUploadController],
  providers: [AppService, FileUploadService],
})
export class AppModule {}
