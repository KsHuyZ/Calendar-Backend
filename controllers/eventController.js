const EventModel = require("../models/EventModel");
const ScheduleModel = require("../models/ScheduleModel");

const eventController = {
  createEvent: async (req, res) => {
    const {
      title,
      idSchedule,
      backgroundColor,
      description,
      start,
      end,
      createdBy,
    } = req.body;

    try {
      const event = new EventModel({
        title,
        idSchedule,
        backgroundColor,
        description,
        start,
        end,
        createdBy,
      });

      await event.save();
      const schedule = await ScheduleModel.findById(idSchedule);
      schedule.idEvent.push(event._id);
      await schedule.save();
      return res.status(200).json({ success: true, id: event._id });
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  },
  updateTimeEvent: async (req, res) => {
    const { _id, start, end } = req.body;
    try {
      const event = await EventModel.findById(_id);
      event.start = start;
      event.end = end;
      await event.save();
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  },
  deleteEvent: async (req, res) => {
    const { id } = req.params;
    try {
      await EventModel.findByIdAndDelete(id);
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(400).json({ success: false });
    }
  },
};
module.exports = eventController;
