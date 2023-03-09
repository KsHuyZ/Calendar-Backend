const mongoose = require("mongoose");
const dbConnect = () => {
  const DB = process.env.DB;
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
