export const uploadFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(pdf)$/)) {
        return callback(new Error('Only pdf files are allowed!'), false);
    }
    callback(null, true);
};

export class fileManager {
    static customFileName(req, file, callback) {
        let fileExtension = '';
        if (file.mimetype.endsWith('pdf')) fileExtension = '.pdf';
        const originalName = file.originalname.split('.')[0];
        callback(null, originalName, fileExtension);
    }
}
