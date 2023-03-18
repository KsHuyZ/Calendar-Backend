const LocationModel = require("../models/location.model");

const locationController = {
  createLocation: async ({ address, latitude, longitude }) => {
    try {
      const location = new LocationModel({
        address,
        latitude,
        longitude,
      });
      await location.save();
      return location._id;
    } catch (error) {
      return { error, msg: "create location error" };
    }
  },
};
module.exports = locationController;
