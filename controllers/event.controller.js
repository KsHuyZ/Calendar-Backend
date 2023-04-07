const EventModel = require("../models/event.model");
const LocationModel = require("../models/location.model");
const { createLocation } = require("./locationController");
const { getEventbyCalendarIdService } = require("../services/event.service");

const eventController = {
  createEvent: async (event) => {
    const {
      title,
      calendarId,
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
        calendarId,
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
  deleteEvent: async (id) => {
    try {
      const event = await EventModel.findByIdAndDelete(id);
      const location = await LocationModel.findByIdAndDelete(event.location);
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
  getEventbyCalendarId: async (req, res) => {
    const { id, year } = req.params;
    const currentYear = Number(year);
    try {
      const events = await getEventbyCalendarIdService(id, currentYear);
      return res.status(200).json({ success: true, events });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, events: [] });
    }
  },
};
module.exports = eventController;
