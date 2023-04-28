const mongoose = require("mongoose");

import handleGetUser from "../../functions/getuser";

const handleStartDice = async (req, res) => {
  let { target, above, betamount } = req.body;

  target = Number(target);
  betamount = Number(betamount);
  if (target <= 0 || target >= 1) {
    res.status(400).json({ message: "Invalid target." });
    return;
  }
  await mongoose.connect(process.env.DBURI);
  const user = await handleGetUser(req, res);

  if (user.balance >= betamount && betamount >= 0) {
    user.balance -= betamount;
    await user.save();
  } else {
    res.status(401).json({ message: "Not enough balance." });
    return;
  }

  const gameresult = Math.round(Math.random() * 1000000) / 1000000;
  const multiplier =
    Math.round((above ? 1 / (1 - target) : 1 / target) * 100) / 100;
  const win = above ? gameresult >= target : gameresult <= target;

  if (win) {
    const winAmount = Math.round(betamount * multiplier * 100) / 100;

    user.balance += winAmount;
    await user.save();
    await mongoose.disconnect();
    res.status(200).json({
      gameinfo: {
        multiplier: multiplier,
        rollresult: gameresult,
        result: 1,
        reward: winAmount,
        userbalance: user.balance,
      },
    });
  } else {
    await mongoose.disconnect();
    res.status(200).json({
      gameinfo: {
        multiplier: 0,
        rollresult: gameresult,
        result: 0,
        reward: 0,
        userbalance: user.balance,
      },
    });
  }
  return;
};

module.exports = handleStartDice;
