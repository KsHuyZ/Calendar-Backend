const EventAttenteesModel = require("../models/eventAttentees.model");
const eventAttenteeService = {
  createEventAttenteeService: async () => {},
  acceptJoinEventAttenteeService: async (eventId, accepted) => {
    console.log("event id", eventId);
    const eventAttentee = await EventAttenteesModel.findOneAndUpdate(
      {
        eventId,
      },
      {
        accepted,
      }
    ).populate("userId eventId");
    console.log(eventAttentee);
    return eventAttentee;
  },
};

module.exports = eventAttenteeService;
