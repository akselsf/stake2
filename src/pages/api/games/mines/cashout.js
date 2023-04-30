const mongoose = require("mongoose");
const { MinesGame } = require("../../../../../mongooseschemas");
import calculateMultiplier from "./calculateMultiplier";
import handleGetUser from "../../functions/getuser";

const handleCashOut = async (req, res) => {
  await mongoose.connect(process.env.DBURI);
  const user = await handleGetUser(req, res);
  if (user === null) {
    res.status(400).json({ errormessage: "error finding user" });
    return;
  }
  const games = await MinesGame.find({ email: user.email });
  if (games.length != 1) {
    await mongoose.disconnect();
    res.status(400).json({ errormessage: "no games started" });
    return;
  }

  const game = games[0];
  const mines = JSON.parse(game.mines);

  const opened = JSON.parse(game.opened);

  if (opened.length == 0) {
    res.status(400).json({ errormessage: "You have not opened any tiles." });
    return;
  }
  const betamount = game.betamount;
  const multiplier = calculateMultiplier(mines.length, opened.length);
  user.balance += Math.round(betamount * multiplier * 100) / 100;
  user.save();

  await MinesGame.deleteMany({ email: user.email });

  await mongoose.disconnect();
  res.status(200).json({
    gameinfo: {
      gameover: true,
      opened: opened,
      mines: mines,
      multiplier: multiplier,
      reward: Math.round(betamount * multiplier * 100) / 100,
      userbalance: user.balance,
    },
  });
  return;
};

module.exports = handleCashOut;
