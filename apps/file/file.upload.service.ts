import { Injectable } from '@nestjs/common';

@Injectable()
export class FileUploadService {
  constructor() {
    // create connection to your file storage
  }

  loadFile(filepath: string): Promise<string> {
    return new Promise<string>((resolve) => {
      const pdfUtil = require('pdf-to-text');
      pdfUtil.pdfToText(filepath, function (err, data) {
        resolve(data);
      });
    });
  }
}
