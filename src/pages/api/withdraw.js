const mongoose = require("mongoose");

import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

const handleWithdraw = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  const { amount } = req.body;
  await mongoose.connect(process.env.DBURI);

  const dbuser = await mongoose
    .model("User")
    .find({ email: session.user.email });
  if (dbuser.length === 0) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  if (dbuser[0].balance < amount) {
    res.status(401).json({ message: "You don't have enough money." });
    return;
  }
  dbuser[0].balance =
    Math.round((dbuser[0].balance - Number(amount)) * 100) / 100;
  await dbuser[0].save();
  const balance = dbuser[0].balance;

  await mongoose.disconnect();

  res.status(200).json({ balance });
};

module.exports = handleWithdraw;
