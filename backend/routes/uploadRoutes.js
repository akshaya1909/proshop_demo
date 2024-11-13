import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router();

//multer.diskStorage - defines where to store uploaded file
const storage = multer.diskStorage({

    // sets the directory to save files
    destination(req, file, cb){

        // file is stored in uploads folder
        // cb - callback
        cb(null, 'uploads/');
    },

    // determines the name of the saved file
    filename(req, file, cb){
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// validates the file type
function checkFileType(file, cb){
    const filetypes = /jpg|jpeg|png/;

    // Check if the file has a valid extension and MIME type
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if(extname && mimetype){
        return cb(null, true);
    }
    else{
        cb('Images only!')
    }
}

const upload = multer({
    storage,
})

router.post('/', upload.single('image'), (req, res) => {
    res.send({
        message: 'Image Uploaded',
        image: `/${req.file.path}`
    })
});

export default router;