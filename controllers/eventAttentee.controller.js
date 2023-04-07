const EventAttenteesModel = require("../models/eventAttentees.model");
const {
  acceptJoinEventAttenteeService,
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
};

module.exports = eventAttentees;
