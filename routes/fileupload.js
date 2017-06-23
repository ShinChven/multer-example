var path = require('path');
var multer = require('multer');
var mkdirp = require('mkdirp');

/**
 * upload file size limit：1mb
 * @type {number}
 */
var fileSize = 1;

/**
 *  files types you allow to upload
 * @type {[*]}
 */
const allowedTypes = [
    '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp',
    '.mp3', '.wav', '.wma',
    '.ogg', '.APE', '.ape', '.docx'
];

/**
 * build a multer instance with directory and path
 */
var upload = function (dir, theFilename) {
    return multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {  // create directory
                var uploads = 'public/uploads/' + dir;
                var uploadDir = path.join(__dirname, '../' + uploads);

                mkdirp(uploadDir,function (err) {
                    if (err) {
                        throw new Error('directory not created.');
                        return;
                    }
                    cb(null, uploads);

                });
            },
            filename: function (req, file, cb) { // set file name
                if (theFilename && theFilename.length > 0) {
                    cb(null, theFilename);
                } else {
                    throw new Error('path not created.');
                }
            }
        }),
        limits: {
            fileSize: fileSize * 1024 * 1024 // file size limit
        },
        fileFilter: function (req, file, cb) { // check file type
            var fileExt = path.extname(file.originalname);
            if (allowedTypes.indexOf(fileExt.toLowerCase()) > -1) {
                cb(null, true);
            } else {
                var err = new Error('Illeagal file extendsion：[' + fileExt + ']。');
                return cb(err);
            }
        }
    })
};

module.exports = upload;