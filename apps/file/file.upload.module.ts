import { Module } from '@nestjs/common';
import { FileUploadService } from './file.upload.service';
import { FileUploadController } from './file.upload.controller';

@Module({
  imports: [],
  providers: [FileUploadService],
  controllers: [FileUploadController],
})
export class FormModule {}
