const mongoose = require("mongoose");
const handleAuth = async () => {
  console.log("dsdek");
  console.log(req);
  /*await mongoose.connect(process.env.DBURI);

  const DBuser = await userSchema.find({ userid: session.githubuserid });
  if (DBuser) {
  }
  session.userbalance = DBuser.balance;*/
  res.status(200);
};

export default handleAuth;
