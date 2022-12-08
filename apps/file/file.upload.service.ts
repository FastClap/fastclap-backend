import { Injectable } from '@nestjs/common';

@Injectable()
export class FileUploadService {
    constructor() {
        // create connection to your file storage
    }

    loadFile(filepath: string): Promise<string> {

        return new Promise<string>(resolve => {
            const pdfUtil = require("pdf-to-text");
            pdfUtil.pdfToText(filepath, function(err, data) {
                resolve(data);
            });
        });

        //
        // console.log("loadFile:", filepath)
        // const pdfUtil = require("pdf-to-text")
        //
        // pdfUtil.info(filepath, function(err, info) {
        //     if (err) throw(err);
        //     console.log(info);
        // });
        //
        // pdfUtil.pdfToText(filepath, async function(err, data) {
        //     if (err) throw(err);
        //     console.log(data);
        //     return new Promise<string>(data) (data);
        // });

    }
}
/*
function delay(milliseconds: number, count: number): Promise<number> {
    return new Promise<number>(resolve => {
        setTimeout(() => {
            resolve(count);
        }, milliseconds);
    });
 }
 */
