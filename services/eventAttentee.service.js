const EventModel = require("../models/event.model");
const EventAttenteesModel = require("../models/eventAttentees.model");
const eventAttenteeService = {
  createEventAttenteeService: async () => {},
  acceptJoinEventAttenteeService: async (eventId, accepted) => {
    const eventAttentee = await EventAttenteesModel.findOneAndUpdate(
      {
        eventId,
      },
      {
        accepted,
      }
    ).populate("userId eventId");
    return eventAttentee;
  },
  getMyEventUpCommingService: async (userId) => {
    const myEvent = await EventModel.find(
      { createdBy: userId, start: { $gte: Date.now() } },
      "title description start end backgroundColor"
    );
    const eventAttentee = await EventAttenteesModel.find({
      userId,
      start: { $gte: Date.now() },
    }).populate("eventId");
    const events = [...myEvent, ...eventAttentee];
    events.sort(function (a, b) {
      return a.start.getTime() - b.start.getTime();
    });
    const slicedArray = events.slice(0, 3);
    return slicedArray;
  },
};

module.exports = eventAttenteeService;
