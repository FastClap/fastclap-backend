import { Injectable } from '@nestjs/common';
import { promisify } from 'util';
import { writeFile } from 'fs';
import {convertToArray} from "class-validator/types/utils";
import {replaceImportPath} from "@nestjs/swagger/dist/plugin/utils/plugin-utils";

@Injectable()
export class FileUploadService {
    constructor() {
        // create connection to your file storage
    }

    loadFile(filepath: string): Promise<string> {

        return new Promise<string>(resolve => {

            const pdfUtil = require("pdf-to-text");

            pdfUtil.pdfToText(filepath, function(err, data) {
                if (err)
                    resolve(err);

                const title_regex = /([0-9]+[.]+ )+([^a-z]+.)+(\n)/gm
                data = data.replace(title_regex, function replace(match) {
                    return '<div className="bold-title">' + match + '</div>' // h2 + strong
                });

                const subtitle_regex = /\n\n[^a-z]*\n/gm;
                data = data.replace(subtitle_regex, function replace(match) {
                    return '<div className="bold-character">' + match + '</div>'; // strong
                });

                const breakline_regex = /\n/gm;
                data = data.replace(breakline_regex, "</br>");

                const pagenumber_regex = /[0-9]+\n\f/g;
                data = data.replace(pagenumber_regex, function replace(match) {
                    return '<div className="indent-pagenumber">' + match + '</div>'; // indent left margin
                });

                resolve(data);
            });

        });
    }

}
