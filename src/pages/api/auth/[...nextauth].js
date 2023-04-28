import NextAuth from "next-auth";

import GitHubProvider from "next-auth/providers/github";
import mongoose from "mongoose";

import { DB_User } from "../../../../mongooseschemas";
export default NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    // OAuth authentication providers...
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },
    async session({ session, token }) {
      await mongoose.connect(process.env.DBURI);
      const DBuser = await DB_User.find({ userid: token.sub });
      if (DBuser.length === 0) {
        const newUser = new DB_User({
          userid: token.sub,
          balance: 0,
          email: token.email,
        });
        await newUser.save();
      }
      const DBuser2 = await DB_User.find({ userid: token.sub });
      session.user.balance = DBuser2[0].balance;
      session.user.githubuserid = DBuser2[0].userid;

      session.accessToken = token.accessToken;
      console.log(session);
      return Promise.resolve(session);
    },
  },
});
