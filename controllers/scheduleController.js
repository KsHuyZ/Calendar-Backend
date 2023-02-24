const ScheduleModel = require("../models/ScheduleModel");
const {
  createAceptNotify,
  getNotifybyIdAndAccept,
} = require("../controllers/notifyController");
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
            "view.idUser": idUser,
            "view.accept": true,
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
        populate: { path: "createdBy location" },
      });

      return res.status(200).json({ success: true, events: schedules.idEvent });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, error });
    }
  },

  getSchedulebyUserandSchedule: async (idUser, idSchedule) => {
    try {
      const schedule = ScheduleModel.findOne({
        _id: idSchedule,
        "view.idUser": idUser,
        "view.accept": true,
      });
      return schedule;
    } catch (error) {
      return null;
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

      const notifies = await createAceptNotify(users, idSchedule, user, msg, 0);

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
  acceptJointoSchedule: async ({ idUser, idSchedule, idNotify }) => {
    try {
      const schedule = await ScheduleModel.findOne({
        _id: idSchedule,
        "view.idUser": idUser,
      });

      let scheduleView = schedule.view;
      const indexView = scheduleView.findIndex(
        (user) => user.idUser.toString() === idUser
      );

      if (indexView > -1) {
        scheduleView[indexView].accept = true;
        schedule.view === scheduleView;
      }

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
      const success = await getNotifybyIdAndAccept(idNotify);
      const user = await UserModel.findById(idUser);
      user.schedules.push(idSchedule);
      await schedule.save();
      await user.save();
      if (success) return true;
    } catch (error) {
      return null;
    }
  },
  deniedJointoSchedule: async (id) => {},
};
module.exports = scheduleController;
