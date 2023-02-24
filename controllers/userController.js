const UserModel = require("../models/UserModel");
const ScheduleModel = require("../models/ScheduleModel");
const userController = {
  checkUserbyGoogleAuth: async (req, res) => {
    const { email, displayName, photoURL } = req.body;
    try {
      const foundUser = await UserModel.findOne({ email });
      if (!foundUser) {
        const newUser = new UserModel({
          email,
          displayName,
          photoURL,
          schedules: [],
        });

        const schedule = new ScheduleModel({
          idOwner: newUser._id,
          idEvent: [],
          view: [],
          edit: [],
          addUser: [],
        });
        newUser.schedules.push(schedule._id);
        await newUser.save();
        await schedule.save();
        return res.status(200).json({ success: true });
      }
      return res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, msg: "Login failed" });
    }
  },
  getUserbyEmail: async (req, res) => {
    const { email } = req.params;
    try {
      const user = await UserModel.findOne({ email });
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
      const user = await UserModel.findById(id, "displayName -_id");
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
  getSchedulebyUserId: async (req, res) => {
    const { id } = req.params;
    try {
      const schedule = await UserModel.findById(id).populate({
        path: "schedules",
        populate: { path: "idOwner" },
      });

      return res.status(200).json({ schedule });
    } catch (error) {
      return res.status(400).json({ success: false });
    }
  },
 
  getUserListbyEmail: async (req, res) => {
    const { email } = req.params;
    try {
      const users = await UserModel.find({
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
