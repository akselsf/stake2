import mongoose from "mongoose";
import handleGetUser from "../../functions/getuser";
import { HiloGame } from "../../../../../mongooseschemas";

import getCard from "./getcard";
import getmultiplierhilo from "./getmultiplierhilo";
import getChanceHilo from "./getchancehilo";

const handleChooseHilo = async (req, res) => {
  const { option } = req.body;
  if (!option) return res.status(400).send("Missing option");
  if (!["higher", "lower", "skip"].includes(option)) {
    return res.status(400).send("Invalid option");
  }
  await mongoose.connect(process.env.DBURI);
  const user = await handleGetUser(req, res);
  if (user === null) {
    await mongoose.disconnect();
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

  if (option === "skip") {
    return handleSkip(res, game, user);
  } else if (option === "lower") {
    return handleLower(res, game, user);
  } else if (option === "higher") {
    return handleHigher(res, game, user);
  }
  return res.status(400).send("Invalid option");
};

const handleSkip = async (res, game, user) => {
  let allcards = JSON.parse(game.allcards);
  allcards[allcards.length - 1].skipped = true;
  allcards.push(getCard());
  game.allcards = JSON.stringify(allcards);
  await game.save();
  await mongoose.disconnect();
  res.status(200).json({
    gameinfo: {
      allcards: allcards,
      userbalance: user.balance,
      gameover: false,
      currentmultiplier: calculateMultipler(allcards),
      chance: getChanceHilo(allcards[allcards.length - 1].card),
    },
  });
  return;
};
const handleLower = async (res, game, user) => {
  let allcards = JSON.parse(game.allcards);
  allcards.push(getCard());
  allcards[allcards.length - 2].option = "lower";

  game.allcards = JSON.stringify(allcards);
  if (
    (allcards[allcards.length - 1].card <= allcards[allcards.length - 2].card &&
      allcards[allcards.length - 2].card != 13) ||
    allcards[allcards.length - 1].card < allcards[allcards.length - 2].card
  ) {
    await game.save();
    await mongoose.disconnect();

    res.status(200).json({
      gameinfo: {
        allcards: allcards,
        userbalance: user.balance,
        gameover: false,
        currentmultiplier: calculateMultipler(allcards),
        chance: getChanceHilo(allcards[allcards.length - 1].card),
      },
    });
    return;
  } else {
    await HiloGame.deleteMany({ email: user.email });

    await mongoose.disconnect();

    res.status(200).json({
      gameinfo: {
        allcards: allcards,
        userbalance: user.balance,
        gameover: true,
        currentmultiplier: 0,
      },
    });
    return;
  }
};
const handleHigher = async (res, game, user) => {
  let allcards = JSON.parse(game.allcards);
  allcards.push(getCard());
  allcards[allcards.length - 2].option = "higher";
  game.allcards = JSON.stringify(allcards);

  if (
    (allcards[allcards.length - 1].card >= allcards[allcards.length - 2].card &&
      allcards[allcards.length - 2].card != 1) ||
    allcards[allcards.length - 1].card > allcards[allcards.length - 2].card
  ) {
    await game.save();
    await mongoose.disconnect();

    res.status(200).json({
      gameinfo: {
        allcards: allcards,
        userbalance: user.balance,
        gameover: false,
        currentmultiplier: calculateMultipler(allcards),
        chance: getChanceHilo(allcards[allcards.length - 1].card),
      },
    });
    return;
  } else {
    await HiloGame.deleteMany({ email: user.email });

    await mongoose.disconnect();

    res.status(200).json({
      gameinfo: {
        allcards: allcards,
        userbalance: user.balance,
        gameover: true,
        currentmultiplier: 0,
      },
    });
    return;
  }
};

const calculateMultipler = (allcards) => {
  let multiplier = 1;
  for (let i = 0; i < allcards.length; i++) {
    if (allcards[i].skipped) {
      multiplier *= 1;
    } else {
      multiplier *= getmultiplierhilo(allcards[i].card, allcards[i].option);
    }
  }
  return Math.round(multiplier * 100) / 100;
};

export default handleChooseHilo;
