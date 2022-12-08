import { Injectable } from '@nestjs/common';

@Injectable()
export class FileUploadService {
    constructor() {
        // create connection to your file storage
    }

    loadFile(filepath: string) {

        console.log("loadFile:", filepath)
        const pdfUtil = require("pdf-to-text")

        pdfUtil.info(filepath, function(err, info) {
            if (err) throw(err);
            console.log(info);
        });

        pdfUtil.pdfToText(filepath, function(err, data) {
            if (err) throw(err);
            console.log(data);
            return (data);
        });

    }
}
