// utils/formatImage.js
const formatImage = (file) => ({
  filename: file.filename,
  originalname: file.originalname,
  mimetype: file.mimetype,
  url: `/uploads/${file.filename}`,
  public_id: "", // if you're not using cloud storage
});

const formatMultipleImages = (files) => files.map(formatImage);

module.exports = { formatImage, formatMultipleImages };
