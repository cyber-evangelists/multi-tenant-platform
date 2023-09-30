import { Router } from "express";
const route = Router();
import {
  SignUp,
  createUser,
  getUsers,
  login,
} from "../controller/userController.js";
// import { v4 as uuidv4 } from "uuid";
// import path from "path";

// import multer from "multer";
// import { fileURLToPath } from "url";
// // import { verification } from "../controllers/verification.js";
// const __filename = fileURLToPath(import.meta.url);

// const __dirname = path.dirname(__filename);
// function handleNoImage(req, res, next) {
//   // Check if there is no image in the request
//   console.log(req.file);
//   if (!req.file) {
//     // Call the next controller
//     console.log("no image");
//     next();
//   } else {
//     // If there is an image, proceed to the upload middleware
//     console.log("image");
//     upload.single("image")(req, res, next);
//   }
// }
// const handleFileUploadError = (err, req, res, next) => {
//   // If no file was uploaded, forward control to the next middleware
//   if (
//     err instanceof multer.MulterError &&
//     err.code === "LIMIT_UNEXPECTED_FILE"
//   ) {
//     return next();
//   }

//   // Otherwise, return an error response
//   return res.status(500).json({ message: "File upload error" });
// };

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "../uploads"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
//   if (allowedFileTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// let upload = multer({ storage, fileFilter });
// import auth from "../middleware/auth.js";

route.post("/SignUp", SignUp);
route.post("/login", login);
route.post("/createUser", createUser);
route.get("/getUsers", getUsers);
// route.get("/getAllUser", GetAllUser);
// route.post(
//   "/updateProfile",
//   upload.single("image"),
//   handleFileUploadError,
//   updateProfile
// );

// route.post("/upload-images", upload.single("files"), uploadImages);

export default route;
