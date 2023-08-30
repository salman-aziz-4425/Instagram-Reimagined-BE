import multer from "multer";

const uploadImage = (maxAllowedImages) => {
    const maxSize=2*1024*1024
    const storage = multer.memoryStorage();
    const upload = multer({
        storage,
        limits: {
            fileSize: maxSize
        }
    });
    return upload.array('images', maxAllowedImages);
}

export default uploadImage