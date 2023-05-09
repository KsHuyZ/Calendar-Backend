const EventAttenteesModel = require("../models/eventAttentees.model");
const {
  acceptJoinEventAttenteeService,
  getMyEventUpCommingService,
} = require("../services/eventAttentee.service");

const eventAttentees = {
  createEventAttentees: async (eventId, userId) => {
    try {
      const eventAttentees = EventAttenteesModel({ eventId, userId });
      await eventAttentees.save();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  acceptJoinEventAttentee: async (eventId) => {
    const eventAttentee = await acceptJoinEventAttenteeService(eventId, true);
    return eventAttentee;
  },
  getMyEventUpComming: async (req, res) => {
    const { userId } = req.body;
    try {
      const events = await getMyEventUpCommingService(userId);
      return res.status(200).json({ success: true, events });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, msg: "Error" });
    }
  },
};

module.exports = eventAttentees;
