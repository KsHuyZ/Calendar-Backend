const { default: mongoose } = require("mongoose");
const Event = require("../models/event.model");

const eventService = {
  getEventbyCalendarIdService: async (id, currentYear) => {
    const events = await Event.aggregate([
      {
        $match: {
          calendarId: mongoose.Types.ObjectId(id),
          start: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`),
          },
        },
      },
      {
        $lookup: {
          from: "eventattentees",
          localField: "_id",
          foreignField: "eventId",
          as: "userJoin",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userJoin.userId",
          foreignField: "_id",
          as: "userJoin",
        },
      },
      {
        $lookup: {
          from: "locations",
          localField: "location",
          foreignField: "_id",
          as: "location",
        },
      },
      {
        $unwind: "$location",
      },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "createdBy",
        },
      },
      {
        $unwind: "$createdBy",
      },
    ]);
    return events;
  },
};
module.exports = eventService;
