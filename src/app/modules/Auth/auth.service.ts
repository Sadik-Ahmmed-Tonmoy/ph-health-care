import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtHelper } from "../../../helpers/jwtHelper";
import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import { UserStatus } from "@prisma/client";

const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
      status: UserStatus.ACTIVE
    },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  // const accessToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
  //   expiresIn: "1d",
  // });

  const accessToken = jwtHelper.generateToken({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, "1d");
  // const refreshToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
  //   expiresIn: "30d",
  // });

  const refreshToken = jwtHelper.generateToken({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, "30d");

  return {
    accessToken,
    refreshToken,
    needResetPassword: user.needResetPassword,
  };
};

const refreshToken = async (refreshToken: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  let decoded;
  try {
    decoded = jwtHelper.verifyToken(refreshToken, process.env.JWT_SECRET);
  } catch (err) {
    throw new Error("Invalid refresh token");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: decoded?.id,
      status: UserStatus.ACTIVE
    },
  });

  if (!user) {
    throw new Error("Invalid refresh token");
  }
  const accessToken = jwtHelper.generateToken({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, "1d");

  return {
    accessToken,
    refreshToken,
    needResetPassword: user.needResetPassword,
  };
};
export const AuthService = {
  loginUser,
  refreshToken,
};
