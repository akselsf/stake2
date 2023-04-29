const mongoose = require("mongoose");
const { MinesGame } = require("../../../../../mongooseschemas");
import calculateMultiplier from "./calculateMultiplier";
import handleGetUser from "../../functions/getuser";

const handleStartMines = async (req, res) => {
  let { tilevalue } = req.body;
  if (isNaN(tilevalue)) {
    res.status(400).json({ errormessage: "dont send shit requests" });
    return;
  }
  tilevalue = Number(tilevalue);
  if (tilevalue < 0 || tilevalue > 24) {
    res.status(400).json({ errormessage: "dont send shit requests" });
    return;
  }

  await mongoose.connect(process.env.DBURI);
  const user = await handleGetUser(req, res);

  const games = await MinesGame.find({ email: user.email });

  if (games.length != 1) {
    await mongoose.disconnect();
    res.status(400).json({
      errormessage: "No games started",
    });

    return;
  }
  const game = games[0];
  const mines = JSON.parse(game.mines);

  if (mines.includes(tilevalue)) {
    await MinesGame.deleteOne({ email: user.email });
    await mongoose.disconnect();
    res.status(200).json({
      gameinfo: {
        gameover: true,
        mines: mines,
        opened: JSON.parse(game.opened),
        multiplier: 0,
        reward: 0,
      },
    });
    return;
  }

  const opened = JSON.parse(game.opened);
  opened.push(tilevalue);
  await MinesGame.updateOne(
    { email: user.email },
    { opened: JSON.stringify(opened) }
  );
  await mongoose.disconnect();

  const multiplier = calculateMultiplier(mines.length, opened.length);
  res.status(200).json({
    gameinfo: {
      gameover: false,
      opened: opened,
      multiplier: multiplier,
      reward: Math.round(game.betamount * multiplier * 100) / 100,
    },
  });
  return;
};
module.exports = handleStartMines;
