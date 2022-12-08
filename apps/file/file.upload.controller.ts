import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { FileUploadService } from './file.upload.service';
import { uploadFileFilter, fileManager } from './file.upload.utils';
import { diskStorage } from 'multer';

import * as path from 'path';

@Controller('upload')
export class FileUploadController {
    constructor(private readonly downloadService: FileUploadService) {}

    @Post()
    @UseInterceptors(
        FileInterceptor('pdf', {
            storage: diskStorage({
                destination: './files',
                filename: fileManager.customFileName
            }),
            fileFilter: uploadFileFilter
        })
    )
    async uploadMyFile(@UploadedFile() file: any) {

        let filepath = path.resolve(process.cwd());
        let file_content = await this.downloadService.loadFile(path.join(filepath, "files/", file.filename));

        console.warn({content: file_content});

        return {
            originalname: file.originalname,
            filename: file.originalname,
            content: file_content,
        };
    }
}
