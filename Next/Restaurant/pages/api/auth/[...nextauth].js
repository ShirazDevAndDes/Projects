import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import dbConnect from "../../../lib/dbConnect";
import clientPromise from "../../../lib/mongodb.js";

export default (req, res) =>
  NextAuth(req, res, {
    // adapter: MongoDBAdapter(clientPromise),

    providers: [
      CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: "Login",
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          // console.log(credentials);

          // Send the login credentials to the login api and get the response back
          const user = await axios
            .post(process.env.BASE_URL + "/api/postUser", {
              ...credentials,
              operation: "read",
              operationType: "userLogin",
            })
            .then(async (response) => {
              const res = await response.data;
              return res;
            })
            .catch((err) => {
              const error = err.response.data;
              // Throw custom error
              throw new Error(error);
            });

          // if credentials were verified then send return them
          if (user) {
            return user.result;
          }
        },
      }),
    ],
    // if errors were send then send them to the directed links
    pages: {
      signIn: "/authError",
      error: "/authError",
    },
    // Set session type
    session: {
      jwt: true,
      strategy: "jwt",
    },
    // Set Callbacks
    callbacks: {
      // Set the jwt tokens
      async jwt({ token, user, account, profile }) {
        if (account && user) {
          return {
            ...token,
            accessToken: user.data.token,
            refreshToken: user.data.refreshToken,
          };
        }

        return token;
      },
      // Set the session
      async session({ session, user, token }) {
        // Get user info
        const webUser = await axios
          .post(process.env.BASE_URL + "/api/postUser", {
            email: session.user.email,
            operation: "read",
            operationType: "userInfo",
          })
          .then(async (response) => {
            const res = await response.data;
            // console.log(res);
            return res.result;
          })
          .catch((err) => {
            const error = err.response;
            console.log(err);
          });

        if (webUser) {
          // console.log(webUser);

          // Set all the session info about the user
          session.user.id = webUser._id;
          session.user.image = webUser.image;
          session.user.username = webUser.username;
          session.user.address = webUser.address;
          session.user.role = webUser.role;
        }
        return session;
      },
    },
  });
