const mongoose = require("mongoose");

import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

const handleGetBalance = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  await mongoose.connect(process.env.DBURI);
  const dbuser = await mongoose
    .model("User")
    .find({ email: session.user.email });

  if (dbuser.length === 0) {
    res.status(401).json({ message: "Error" });
    return;
  }
  const balance = dbuser[0].balance;
  await mongoose.disconnect();

  res.status(200).json({ balance });
};

module.exports = handleGetBalance;
