const users = [];

const addUser = ({ id, _id, displayName, room, photoURL }) => {
  displayName = displayName?.trim().toLowerCase();
  room = room.trim().toLowerCase();
  photoURL = photoURL;
  // const existingUser = users.find((user) => {
  //   user.room === room && user.displayName === displayName;
  // });

  // if (existingUser) {
  //   return { error: "UserName is taken" };
  // }
  const user = { id, _id, displayName, room, photoURL };

  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getRoombyUser = (id) => {
  const u = users.find((user) => user.id === id);
  return u?.room;
};

const getUser = (id) => users.find((user) => user._id === id);

const getUserbyId = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const getUserInRoom = (_id, room) =>
  users.filter((user) => user._id === _id && user.room === room);

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  getUserInRoom,
  getRoombyUser,
};
