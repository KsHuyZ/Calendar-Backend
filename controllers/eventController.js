const EventModel = require("../models/EventModel");
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
        path: "createdBy",
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
};
module.exports = eventController;
