import multer  from 'multer';

const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, './uploads/')
    },
    
    filename: function (_: any, file: any, cb: any) {
        cb(null, file.originalname)
    }
});


const fileFilter = (_: any,file: any,cb: any) => {
    if(file.mimetype === "image/jpg"  || 
       file.mimetype ==="image/jpeg"  || 
       file.mimetype ===  "image/png"){
     
    cb(null, true);
   }else{
      cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
}
}
const upload = multer({storage: storage, fileFilter : fileFilter});

export default upload;