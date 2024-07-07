// src/config/multer.ts
import multer from 'multer';

const storage = multer.memoryStorage(); // Guarda los archivos en memoria

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limitar el tamaño del archivo a 5MB
  },
  fileFilter: (req, file, cb:any) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});

export { upload };
