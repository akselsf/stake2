const mongoose = require("mongoose");

import handleGetUser from "../../functions/getuser";
import getMultiPlierXPos from "./getMultiplierXPos";

const handleStartPlinko = async (req, res) => {
  let { betamount } = req.body;

  if (isNaN(betamount)) {
    res.status(400).json({ message: "Invalid bet." });
    return;
  }

  betamount = Number(betamount);

  if (betamount < 0) {
    res.status(400).json({ errormessage: "Invalid bet amount." });
    return;
  }

  await mongoose.connect(process.env.DBURI);
  const user = await handleGetUser(req, res);
  if (user === null) {
    res.status(400).json({ errormessage: "error finding user" });
    return;
  }
  if (user.balance >= betamount) {
    user.balance -= betamount;
    await user.save();
  } else {
    res.status(400).json({ errormessage: "Not enough balance." });
    return;
  }
  let directions = [];
  let multiplier;
  let x = 0;
  for (let i = 0; i < 16; i++) {
    const d = Math.floor(Math.random() * 2);
    directions.push(d);
    if (d == 1) {
      x++;
    }
  }
  multiplier = getMultiPlierXPos(x, 16);

  const winAmount = betamount * multiplier;
  user.balance += winAmount;

  await user.save();
  await mongoose.disconnect();
  res.status(200).json({
    gameinfo: {
      directions: directions,
      multiplier: multiplier,
      result: 1,
      reward: winAmount,
      userbalance: user.balance,
    },
  });

  return;
};

export default handleStartPlinko;
