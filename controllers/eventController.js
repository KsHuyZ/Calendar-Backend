const EventModel = require("../models/EventModel");
const NotifyModel = require("../models/NotifyModel");
const ScheduleModel = require("../models/ScheduleModel");
const { createLocation } = require("./locationController");

const eventController = {
  createEvent: async (event) => {
    const {
      title,
      idSchedule,
      backgroundColor,
      description,
      start,
      end,
      location,
      createdBy,
    } = event;

    try {
      const { address, latitude, longitude } = location;
      const locaId = await createLocation(location);

      const event = new EventModel({
        title,
        idSchedule,
        backgroundColor,
        description,
        start,
        end,
        location: locaId,
        createdBy,
      });

      await event.save();
      const eventPopulate = await EventModel.populate(event, {
        path: "createdBy location",
      });
      const schedule = await ScheduleModel.findById(idSchedule);
      schedule.idEvent.push(event._id);
      await schedule.save();
      return { success: true, event: eventPopulate };
    } catch (error) {
      console.log(error);
      return { success: false, error };
    }
  },

  getEventbyId: async (req, res) => {
    const id = req.params.id;
    try {
      const event = await EventModel.findById(id).populate(
        "location createdBy"
      );
      return res.status(200).json({ success: true, event });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false });
    }
  },

  updateTimeEvent: async (id, start, end) => {
    try {
      const event = await EventModel.findById(id);
      event.start = start;
      event.end = end;
      await event.save();
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  },
  deleteEvent: async (id, idSchedule) => {
    try {
      const event = await EventModel.findByIdAndDelete(id);
      const schedule = await ScheduleModel.findById(idSchedule);
      schedule.idEvent.pop(event._id);
      await schedule.save();
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  },
  userJointoEvent: async (req, res) => {
    const id = req.params.id;
    const { idUser, idNotify } = req.body;
    console.log(id, idUser);
    try {
      const event = await EventModel.findById(id);
      let users = event.userJoin;
      users.push(idUser);
      event.userJoin = users;
      await NotifyModel.findOneAndUpdate(
        { _id: idNotify },
        { seen: true, accept: 1 }
      );
      await event.save();
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(400).json({ success: false });
    }
  },
};
module.exports = eventController;
