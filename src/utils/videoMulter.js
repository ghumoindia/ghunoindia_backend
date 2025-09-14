const multer = require("multer");
const path = require("path");
const fs = require("fs");

const videoUploadPath = path.join(__dirname, "../uploads/videos");
if (!fs.existsSync(videoUploadPath))
  fs.mkdirSync(videoUploadPath, { recursive: true });

// Storage for videos
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, videoUploadPath),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

// Video file filter
const fileFilter = (req, file, cb) => {
  console.log("file data ", file);
  const allowedTypes = /mp4|mov|avi|mkv|webm/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext) && file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(
      new Error("Only video files (.mp4, .mov, .avi, .mkv, .webm) are allowed")
    );
  }
};

// Multer config
const uploadVideo = multer({
  storage,
  //   limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  limits: { fileSize: 200 * 1024 * 1024 }, // 200MB

  fileFilter,
}).single("file");

module.exports = uploadVideo;
