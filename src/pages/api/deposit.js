const mongoose = require("mongoose");

import handleGetUser from "./functions/getuser";

const handleDeposit = async (req, res) => {
  const { amount } = req.body;
  if (isNaN(amount) || amount <= 0) {
    res.status(400).json({ errormessage: "invalid amount" });
  }
  await mongoose.connect(process.env.DBURI);
  const dbuser = await handleGetUser(req, res);
  if (dbuser === null) {
    res.status(400).json({ errormessage: "error finding user" });
    return;
  }
  dbuser.balance = Math.round((Number(amount) + dbuser.balance) * 100) / 100;
  await dbuser.save();
  const balance = dbuser.balance;

  await mongoose.disconnect();

  res.status(200).json({ balance: balance });
};

export default handleDeposit;
