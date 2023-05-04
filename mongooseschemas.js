const { NumberInput } = require("@mantine/core");
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

const storeColorThemeSchema = new mongoose.Schema({
  color: String,
  price: Number,
  name: String,
});

const hilogameSchea = new mongoose.Schema({
  userid: String,
  email: String,
  betamount: Number,
  allcards: String,
  notskipped: String,
});

module.exports = {
  DB_User: mongoose.models.User || mongoose.model("User", userSchema),
  MinesGame:
    mongoose.models.MinesGame || mongoose.model("MinesGame", minesgameSchema),
  StoreColorTheme:
    mongoose.models.StoreColorTheme ||
    mongoose.model("StoreColorTheme", storeColorThemeSchema),
  HiloGame:
    mongoose.models.HiloGame || mongoose.model("HiloGame", hilogameSchea),
};
