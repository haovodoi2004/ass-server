const multer = require('multer');
const fs = require("fs");


const _storage = multer.diskStorage({
    destination:  (req, file, cb)=> {
        const dir = './public/uploads/';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir ,{recursive: true});
        }
        cb(null, dir);
    },filename:  (req, file, cb) =>{
        cb(null, file.fieldname +"-" + Date.now() + file.originalname);
    }
})
const upload = multer({storage:_storage})

module.exports = upload