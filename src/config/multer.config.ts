import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

const fileStorage = diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) =>
    cb(null, new Date().getTime() + '-' + file.originalname),
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const multerConfig: MulterOptions = {
  dest: '/images',
  storage: fileStorage,
  fileFilter: fileFilter,
};
