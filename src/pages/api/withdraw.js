const mongoose = require("mongoose");

import handleGetUser from "./functions/getuser";

const handleWithdraw = async (req, res) => {
  let { amount } = req.body;
  if (isNaN(amount) || amount <= 0) {
    res.status(400).json({ errormessage: "invalid amount" });
  }
  amount = Number(amount);

  await mongoose.connect(process.env.DBURI);
  const dbuser = await handleGetUser(req, res);
  if (dbuser === null) {
    res.status(400).json({ errormessage: "error finding user" });
    return;
  }
  if (dbuser.balance < amount) {
    res.status(401).json({ errormessage: "You don't have enough money." });
    return;
  }
  dbuser.balance = Math.round((dbuser.balance - amount) * 100) / 100;
  await dbuser.save();
  const balance = dbuser.balance;

  await mongoose.disconnect();

  res.status(200).json({ balance: balance });
};

export default handleWithdraw;
