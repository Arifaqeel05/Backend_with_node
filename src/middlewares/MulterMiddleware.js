import multer from 'multer';


// Configure storage for uploaded files
const storage = multer.diskStorage({
  // Set the destination folder where files will be stored
  destination: function (req, file, cb) {
    cb(null, '/public/temp'); // You can replace this path with your desired folder
  },

  // Set a unique filename for each uploaded file
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

// Create an upload instance with the defined storage configuration
export const upload = multer({  storage });