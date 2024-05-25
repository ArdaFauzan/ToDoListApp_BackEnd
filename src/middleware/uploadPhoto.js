const multer = require('multer');
require('dotenv').config()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },

    filename: (req, file, cb) => {
        cb(null, `images-${Date.now().toString()}-${file.originalname}`);
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