import {Controller, Post, Res, UploadedFile, UseInterceptors} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as express from 'express'
import { FileUploadService } from './file.upload.service';
import { uploadFileFilter, fileManager } from './file.upload.utils';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('upload')
export class FileUploadController {
    constructor(private readonly fileUploadService: FileUploadService) {}

    @Post()
    @UseInterceptors(
        FileInterceptor('pdf', {
            storage: diskStorage({
                destination: '/home/node/app/files',
                filename: fileManager.customFileName
            }),
            fileFilter: uploadFileFilter
        })
    )
    async uploadMyFile(@UploadedFile() file: any) {

        let filepath = path.resolve(process.cwd());
        let file_content = await this.fileUploadService.loadFile(path.join(filepath, "files/", file.filename));

        return {
            content: file_content,
        };
    }
}
