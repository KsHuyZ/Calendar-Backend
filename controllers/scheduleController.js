const ScheduleModel = require("../models/ScheduleModel");
const { createAceptNotify } = require("../controllers/notifyController");
const UserModel = require("../models/UserModel");
const scheduleController = {
  getSchedulebyUserId: async (req, res) => {
    const { id, idUser, year } = req.params;
    const currentYear = Number(year);
    try {
      const schedules = await ScheduleModel.findOne({
        _id: id,
        $or: [
          {
            idOwner: idUser,
          },
          {
            view: {
              idUser,
              accept: true,
            },
          },
        ],
      }).populate({
        path: "idEvent",
        match: {
          start: {
            $gte: `${currentYear}-01-01`,
            $lte: `${currentYear}-12-31`,
          },
        },
        populate: { path: "createdBy" },
      });

      return res.status(200).json({ success: true, events: schedules.idEvent });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, error });
    }
  },
  userJointoSchedule: async (users, idSchedule, user, permissions) => {
    try {
      const schedule = await ScheduleModel.findOne({
        _id: idSchedule,
        $or: [
          {
            idOwner: user,
          },
          {
            share: {
              idUser: user,
              accept: true,
            },
          },
        ],
      }).populate("idOwner");
      const u = await UserModel.findOne({ _id: user }, "displayName -_id");

      const handleCheckMsg = () => {
        return user === schedule.idOwner._id.toString()
          ? "their"
          : `${u.displayName}'s`;
      };

      const msg = `${
        u.displayName
      } invited you to ${handleCheckMsg()} schedule`;
      const api = `/schedules/accept/${idSchedule}`;

      const notifies = await createAceptNotify(
        users,
        idSchedule,
        user,
        msg,
        0,
        api
      );

      if (permissions.view) {
        users.map(
          (u) =>
            (schedule.view = schedule.view.concat({
              idUser: u,
            }))
        );
      }

      if (permissions.update) {
        users.map(
          (u) =>
            (schedule.edit = schedule.edit.concat({
              idUser: u,
            }))
        );
      }

      if (permissions.share) {
        users.map(
          (u) =>
            (schedule.addUser = schedule.addUser.concat({
              idUser: u,
            }))
        );
      }
      await schedule.save();
      return notifies;
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  },
  acceptJointoSchedule: async (req, res) => {
    const { idUser } = req.body;
    const { id: idSchedule } = req.params;
    const schedule = await ScheduleModel.findOne({
      _id: idSchedule,
      "view.idUser": idUser,
      "view.accept": false,
    });
    let scheduleEdit = schedule.edit;
    const indexEdit = scheduleEdit.findIndex((user) => user._id === idUser);
    if (indexEdit > -1) {
      scheduleEdit[indexEdit].accept = true;
      schedule.edit === scheduleEdit;
    }

    let scheduleaddUser = schedule.addUser;
    const indexAddUser = scheduleaddUser.findIndex(
      (user) => user._id === idUser
    );
    if (indexAddUser > -1) {
      scheduleaddUser[indexAddUser].accept = true;
      schedule.addUser = scheduleaddUser;
    }
  },
};
module.exports = scheduleController;
