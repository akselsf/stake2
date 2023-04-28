const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userid: String,
  email: String,
  balance: Number,
});

const minesgameSchema = new mongoose.Schema({
  userid: String,
  email: String,
  betamount: Number,
  opened: String,
  mines: String,
});

module.exports = {
  DB_User: mongoose.models.User || mongoose.model("User", userSchema),
  MinesGame:
    mongoose.models.MinesGame || mongoose.model("MinesGame", minesgameSchema),
};

//module.exports = mongoose.models.User || mongoose.model("User", userSchema);
