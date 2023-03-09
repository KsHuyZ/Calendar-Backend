const mongoose = require("mongoose");
const dbConnect = () => {
  const DB =
    "mongodb+srv://kshuyz:kshuyz0055@cluster0.qd1uf.mongodb.net/Schedule?retryWrites=true&w=majority";
  mongoose.set("strictQuery", false);
  // mongoose.set("strictPopulate", false);
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      console.log("Connect to mongodb");
    });
};

module.exports = dbConnect;
