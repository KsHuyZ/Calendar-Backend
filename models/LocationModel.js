const mongoose = require("mongoose");
const location = mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
});
const LocationModel = mongoose.model("Location", location);
module.exports = LocationModel;
