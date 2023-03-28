const User = require("../models/user.model");
const Calendar = require("../models/calendar.model");
const CalendarUsers = require("../models/calendarUser.model");
const userController = {
  checkUserbyGoogleAuth: async (req, res) => {
    const { uid, email, displayName, photoURL } = req.body;
    try {
      const foundUser = await User.findOne({ email });
      if (!foundUser) {
        const newUser = new User({
          uid,
          email,
          userName: displayName,
          photoURL,
        });
        await newUser.save();
        return res.status(200).json({ success: true, user: newUser });
      }
      return res.status(200).json({ success: true, user: foundUser });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, msg: "Login failed" });
    }
  },
  getUserbyUid: async (req, res) => {
    const { uid } = req.params;
    try {
      const user = await User.findOne({ uid });
      if (!user) {
        return res.status(200).json({ success: false, msg: "User not exist!" });
      }
      return res.status(200).json({ success: true, user });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, error });
    }
  },
  getUserbyId: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id, "userName -_id");
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
  getCalendarbyUserId: async (req, res) => {
    const { id } = req.params;
    try {
      const calendar = await Calendar.find({
        $or: [
          {
            ownerId: id,
          },
          {
            _id: {
              $in: await CalendarUsers.find({
                userId: id,
                accepted: true,
              }).distinct("calendarId"),
            },
          },
        ],
      });

      return res.status(200).json({ success: true, calendar });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false });
    }
  },
  getUserListbyEmail: async (req, res) => {
    const { email } = req.params;
    try {
      const users = await User.find({
        email: { $regex: ".*" + email + ".*" },
      });

      return res.status(200).json({ success: true, users });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, error });
    }
  },
};
module.exports = userController;
