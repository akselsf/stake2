const mongoose = require("mongoose");
const { HiloGame } = require("../../../../../mongooseschemas");
import handleGetUser from "../../functions/getuser";
import getChanceHilo from "./getchancehilo";
import getCard from "./getcard";
const handleStartHilo = async (req, res) => {
  let { betamount } = req.body;
  if (isNaN(betamount)) {
    res.status(400).json({ errormessage: "Invalid input." });
    return;
  }

  betamount = Number(betamount);

  if (betamount < 0) {
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

  const cards = [getCard()];

  await HiloGame.deleteMany({ email: user.email });

  const newHiloGame = new HiloGame({
    userid: user.githubuserid,
    email: user.email,
    betamount: betamount,

    allcards: JSON.stringify(cards),
  });

  await newHiloGame.save();
  await mongoose.disconnect();
  res.status(200).json({
    gameinfo: {
      gameover: false,
      allcards: cards,

      currentmultiplier: 1,
      reward: betamount,
      userbalance: user.balance,
      chance: getChanceHilo(cards[cards.length - 1].card),
    },
  });
  return;
};

module.exports = handleStartHilo;
