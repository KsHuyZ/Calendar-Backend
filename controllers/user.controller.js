const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const Calendar = require("../models/calendar.model");
const CalendarUsers = require("../models/calendarUser.model");
const {
  createUser,
  activeUserService,
  loginService,
} = require("../services/user.service");
const { sendMail } = require("../utils/sendMail");
const { generateToken } = require("../config/jwtToken");

const userController = {
  checkUserbyGoogleAuth: async (req, res) => {
    const { email, displayName, photoURL } = req.body;
    try {
      const foundUser = await User.findOne({ email });

      if (!foundUser) {
        const newUser = new User({
          email,
          userName: displayName,
          photoURL,
        });
        const { accessToken, refreshToken } = generateToken(newUser);

        let refreshTokenReturn = newUser.refreshToken;
        if (!newUser.refreshToken) {
          refreshTokenReturn = refreshToken;
          newUser.refreshToken = refreshToken;
        }
        await newUser.save();
        return res.status(200).json({
          success: true,
          user: newUser,
          accessToken,
          refreshTokenReturn,
        });
      }
      const { accessToken, refreshToken } = generateToken(foundUser);

      let refreshTokenReturn = foundUser.refreshToken;
      if (!foundUser.refreshToken) {
        refreshTokenReturn = refreshToken;
        foundUser.refreshToken = refreshToken;
        await foundUser.save();
      }
      return res.status(200).json({
        success: true,
        user: foundUser,
        accessToken,
        refreshToken: refreshTokenReturn,
      });
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
  register: async (req, res) => {
    const { userName, email, password, phoneNumber } = req.body;
    if (!userName || !email || !password || !phoneNumber)
      return res.status(400).json({ msg: "please enter all field" });

    const photoURL = req.file.path;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser(
      userName,
      email,
      hashedPassword,
      photoURL,
      phoneNumber
    );
    if (user === "user_exist") return res.status(400).json({ msg: user });
    const htmlForm = `<div>
    <h1>Welcome to My Schedule!</h1>
	<p>Thank you for joining our website. We are excited to have you on board!</p>
  <a href="http://localhost:4000/user/active/${user._id}">Active account</a>
    </div>`;
    sendMail(
      email,
      `Welcome ${userName.split(" ")[0]} to My Schedule`,
      htmlForm
    );
    return res.status(200).json({ success: true });
  },
  activeUser: async (req, res) => {
    const { id } = req.params;
    const user = await activeUserService(id);
    if (user) return res.redirect("http://localhost:3000/login");
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await loginService(email, password);
    if (typeof user === "string") return res.status(400).json({ msg: user });
    const { accessToken, refreshToken } = generateToken(user);

    let refreshTokenReturn = user.refreshToken;
    if (!user.refreshToken) {
      refreshTokenReturn = refreshToken;
      user.refreshToken = refreshToken;
      await user.save();
    }

    return res.status(200).json({
      success: true,
      msg: "login_success",
      accessToken,
      refreshToken: refreshTokenReturn,
      user,
    });
  },
};
module.exports = userController;
