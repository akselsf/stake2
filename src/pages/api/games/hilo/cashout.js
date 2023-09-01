const mongoose = require("mongoose");

import handleGetUser from "../../functions/getuser";
import { HiloGame } from "../../../../../mongooseschemas";
import getMultiplierHilo from "./getmultiplierhilo"

const handleCashOut = async (req, res) => {
  await mongoose.connect(process.env.DBURI);
  const user = await handleGetUser(req, res);
  if (user === null) {
    res.status(400).json({ errormessage: "error finding user" });
    return;
  }
  const games = await HiloGame.find({ email: user.email });
  if (games.length != 1) {
    await mongoose.disconnect();
    res.status(400).json({ errormessage: "no games started" });
    return;
  }

  const game = games[0];
  const allcards = JSON.parse(game.allcards);

  if (allcards.length < 2) {
    res
      .status(400)
      .json({ errormessage: "You have not opened chosen anything." });
    return;
  }
  const betamount = game.betamount;
  const multiplier = calculateMultipler(allcards);

  user.balance += Math.round(betamount * multiplier * 100) / 100;
  user.save();

  await HiloGame.deleteMany({ email: user.email });

  await mongoose.disconnect();

  res.status(200).json({
    gameinfo: {
      allcards: allcards,
      userbalance: user.balance,
      gameover: true,
      currentmultiplier: calculateMultipler(allcards),
    },
  });
  return;
};

const calculateMultipler = (allcards) => {
  let multiplier = 1;
  for (let i = 0; i < allcards.length; i++) {
    if (allcards[i].skipped) {
      multiplier *= 1;
    } else {
      multiplier *= getMultiplierHilo(allcards[i].card, allcards[i].option);
    }
  }
  return Math.round(multiplier * 100) / 100;
};

export default handleCashOut;
