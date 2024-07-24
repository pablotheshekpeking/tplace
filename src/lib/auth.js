import { User } from "next-auth";
import prisma from "./prisma";

import { compare } from "bcrypt";



export const login = async (username, password) => {
  const user = await prisma.user.findFirst({
    where: {
      email: username,
    },
  });
  if (user && (await compare(password, user.password))) {
    user.password = "";
    return user;
  } else throw new Error("User Not Found!");
};