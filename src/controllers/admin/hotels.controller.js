const Hotel = require("../../../models/hotels");
const {
  formatImage,
  formatMultipleImages,
} = require("../../utils/ImageFormter");

const createHotel = async (req, res) => {
  try {
    const { body, files } = req;
    const hotelData = {
      ...body,
      coverImage: files?.coverImage?.[0]
        ? formatImage(files.coverImage[0])
        : undefined,
      slideshowImages: files?.slideshowImages
        ? formatMultipleImages(files.slideshowImages)
        : [],
    };

    if (typeof hotelData.stateIds === "string") {
      hotelData.stateIds = JSON.parse(hotelData.stateIds).map((id) =>
        id.replace(/['"]+/g, "")
      );
    }

    const hotel = new Hotel(hotelData);
    await hotel.save();

    res.status(201).json({ success: true, message: "Hotel created", hotel });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create hotel",
      error: err.message,
    });
  }
};

const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().populate("stateIds", "name");
    res.json({ success: true, message: "Hotel list", hotels });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch hotels",
      error: err.message,
    });
  }
};

const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id).populate(
      "stateIds",
      "name"
    );
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.json({ success: true, message: "Get successfully", hotel });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch hotel",
      error: err.message,
    });
  }
};

const updateHotel = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };

    if (req.files || req.file) {
      const { coverImage, slideshowImages } = req.files || {};
      if (coverImage && coverImage[0]) {
        data.coverImage = formatImage(coverImage[0]);
      }
      if (slideshowImages && slideshowImages.length > 0) {
        data.slideshowImages = formatMultipleImages(slideshowImages);
      }
    }

    if (typeof data.stateIds === "string") {
      data.stateIds = JSON.parse(data.stateIds).map((id) =>
        id.replace(/['"]+/g, "")
      );
    }

    const hotel = await Hotel.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    res.json({ success: true, message: "Hotel updated", hotel });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update hotel",
      error: err.message,
    });
  }
};

const deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.json({ success: true, message: "Hotel deleted" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete hotel",
      error: err.message,
    });
  }
};

module.exports = {
  createHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
};
