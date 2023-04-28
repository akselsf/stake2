import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
const mongoose = require("mongoose");
const handleGetUser = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return null;
  }

  await mongoose.connect(process.env.DBURI);
  const dbuser = await mongoose
    .model("User")
    .find({ email: session.user.email });

  if (dbuser.length === 0) {
    return null;
  }
  const user = dbuser[0];

  return user;
};

module.exports = handleGetUser;
