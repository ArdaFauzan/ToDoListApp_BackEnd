const multer = require('multer');
const { S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require('multer-s3');
require('dotenv').config()

const s3 = new S3Client({
    credentials: {
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        accessKeyId: process.env.ACCESS_KEY_ID
    },
    region: process.env.REGION
})

const storage = multerS3({
    s3: s3,
    bucket:process.env.BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
    key: function (req, file, cb) {
        cb(null, `images/${Date.now().toString()}-${file.originalname}`);
    }
})

const checkFileType = (file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
      } else {
        cb(new Error('Not a picture! Please upload only images.'), false);
      }
}

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    }
})

const uploadPhotoMiddleware = upload

module.exports = uploadPhotoMiddleware