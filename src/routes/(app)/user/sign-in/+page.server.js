// @ts-nocheck

// import * as db from "$lib/server/database";
// import { getAllUsers } from "$lib/server/database";
import { login } from '$lib/auth.js';
import { fail, redirect } from "@sveltejs/kit"
import { user } from '../../../../db/user.js';

export const load = async ({ locals, cookies }) => {
  // redirect user if logged in
  const session = cookies.get("session");
  const usersFromDB = await user.find({}).toArray();
  
  
  // Transform MongoDB documents to plain JavaScript objects
  const users = usersFromDB.map(user => {
    // Convert MongoDB ObjectId to a string
    const { _id, ...userData } = user;
    return { ...userData, _id: _id.toString() };
  });
  
  console.log("user atat",users);
  // let userssss = getAllUsers();
  return {
    users: users,
    // user: userssss,
    sessions: session,
  };
};

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get("email");
    const password = data.get("password");

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email ||
      !password
    ) {
      return fail(400, { error: "Email and password are required" });
    }

    // let user = db.getUser(email);
    let user = true; //will be removed
    if (!user) return fail(400, { error: "Email and password are incorrect" });
    if (user) {
      cookies.set("session", email, { path: "/user/sign-in" });
      login();
      throw redirect(302, "/");
    }
  },
};
