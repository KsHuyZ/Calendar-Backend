const ScheduleModel = require("../models/ScheduleModel");
const EventModel = require("../models/EventModel");

const scheduleController = {
  getSchedulebyUserId: async (req, res) => {
    const { id, idUser, year } = req.params;
    const currentYear = Number(year);
    try {
      const schedules = await ScheduleModel.findOne({
        _id: id,
        $or: [
          {
            idOwner: idUser,
          },
          {
            view: idUser,
          },
        ],
      }).populate({
        path: "idEvent",
        match: {
          start: {
            $gte: `${currentYear}-01-01`,
            $lte: `${currentYear}-12-31`,
          },
        },
      });

      return res
        .status(200)
        .json({ success: true, events: schedules.idEvent, id: schedules._id });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, error });
    }
  },
};
module.exports = scheduleController;
