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

export const loadFile = (filepath: string): Promise<string> => {
  return new Promise<string>((resolve) => {
    const pdfUtil = require('pdf-to-text');

    pdfUtil.pdfToText(filepath, function (err, data) {
      if (err) resolve(err);

      const title_regex = /([0-9]+[.]+ )+([^a-z]+.)+(\n)/gm;
      data = data.replace(title_regex, function replace(match, g1, g2, g3) {
        console.log({
          groups: {
            g1: g1,
            g2: g2,
            g3: g3,
          },
        });
        return '<div className="bold-title">' + match + '</div>'; // h2 + strong
      });

      const subtitle_regex = /\n\n[^a-z]*\n/gm;
      data = data.replace(subtitle_regex, function replace(match) {
        return '<div className="bold-character">' + match + '</div>'; // strong
      });

      const breakline_regex = /\n/gm;
      data = data.replace(breakline_regex, '</br>');

      const pagenumber_regex = /( +)([0-9]+)([\/br<>div]+\f)/g;
      data = data.replace(
        pagenumber_regex,
        function replace(match, g1, g2, g3) {
          console.log({
            groups: {
              g1: g1,
              g2: g2,
              g3: g3,
            },
          });
          return ' '; // remove page number
        },
      );

      resolve(data);
    });
  });
};
