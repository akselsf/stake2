const mongoose = require("mongoose");
const { MinesGame } = require("../../../../../mongooseschemas");
import handleGetUser from "../../functions/getuser";

const handleStartMines = async (req, res) => {
  let { minecount, betamount } = req.body;
  if (isNaN(minecount) || isNaN(betamount)) {
    res.status(400).json({ errormessage: "Invalid input." });
    return;
  }
  minecount = Number(minecount);
  betamount = Number(betamount);

  if (minecount > 24 || minecount < 1) {
    res.status(400).json({ errormessage: "Invalid mine count." });
    return;
  } else if (betamount < 0) {
    res.status(400).json({ errormessage: "Invalid bet amount." });
  }
  await mongoose.connect(process.env.DBURI);
  const user = await handleGetUser(req, res);
  if (user === null) {
    res.status(400).json({ errormessage: "error finding user" });
    return;
  }
  if (user.balance >= betamount) {
    user.balance -= betamount;
    user.save();
  } else {
    res.status(401).json({ errormessage: "Not enough balance." });
    return;
  }

  let mines = new Set();
  while (mines.size < minecount) {
    mines.add(Math.floor(Math.random() * 25));
  }
  mines = Array.from(mines).sort((a, b) => a - b);
  await MinesGame.deleteMany({ email: user.email });

  console.log(mines);
  const newMinesGame = new MinesGame({
    userid: user.githubuserid,
    email: user.email,
    betamount: betamount,
    opened: "[]",
    mines: JSON.stringify(mines),
  });

  await newMinesGame.save();
  await mongoose.disconnect();
  res.status(200).json({
    gameinfo: {
      gameover: false,
      opened: [],
      multiplier: 1,
      reward: betamount,
      userbalance: user.balance,
    },
  });
  return;
};

module.exports = handleStartMines;
