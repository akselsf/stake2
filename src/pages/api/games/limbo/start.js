const mongoose = require("mongoose");

import handleGetUser from "../../functions/getuser";

const handleStartLimbo = async (req, res) => {
  let { targetmultiplier, betamount } = req.body;
  if (isNaN(targetmultiplier) || isNaN(betamount)) {
    res.status(400).json({ message: "Invalid inputs." });
    return;
  }

  targetmultiplier = Number(targetmultiplier);
  betamount = Number(betamount);
  if (targetmultiplier <= 1) {
    res.status(400).json({ errormessage: "Invalid target." });
    return;
  }
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

  const gameresult =
    Math.floor((1e8 / (Math.random() * 1e8)) * 0.99 * 100) / 100;

  if (gameresult > targetmultiplier) {
    const winAmount = Math.round(betamount * targetmultiplier * 100) / 100;

    user.balance += winAmount;
    await user.save();
    await mongoose.disconnect();
    res.status(200).json({
      gameinfo: {
        multiplier: gameresult,
        result: 1,
        reward: winAmount,
        userbalance: user.balance,
      },
    });
  } else {
    await mongoose.disconnect();
    res.status(200).json({
      gameinfo: {
        multiplier: gameresult,
        result: 0,
        reward: 0,
        userbalance: user.balance,
      },
    });
  }
  return;
};

export default handleStartLimbo;
