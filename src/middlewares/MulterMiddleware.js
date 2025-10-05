// import multer from 'multer';


// // Configure storage for uploaded files
// const storage = multer.diskStorage({
//   // Set the destination folder where files will be stored
//   destination: function (req, file, cb) {
//     cb(null, '.'); // You can replace this path with your desired folder
//   },

//   // Set a unique filename for each uploaded file
//   filename: function (req, file, cb) {
    
//      cb(null, file.originalname)
//   }
// });

// // Create an upload instance with the defined storage configuration
// export const upload = multer({  storage });

import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ 
    storage, 
})