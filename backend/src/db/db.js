const mongoose = require("mongoose");

 function connectDB() {
  mongoose
    .connect(process.env.MONGOOSE_URL)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB");
    });
}
module.exports = connectDB;
