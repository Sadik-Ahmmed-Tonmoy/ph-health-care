import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { jwtHelper } from "../../../helpers/jwtHelper";
import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import { UserStatus } from "@prisma/client";
import config from "../../../config";
import ApiError from "../../errors/ApiError";
import status from "http-status";

const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
      status: UserStatus.ACTIVE,
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

  const accessToken = jwtHelper.generateToken(
    { id: user.id, email: user.email, role: user.role },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expires_id as string
  );
  // const refreshToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
  //   expiresIn: "30d",
  // });

  const refreshToken = jwtHelper.generateToken(
    { id: user.id, email: user.email, role: user.role },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needResetPassword: user.needResetPassword,
  };
};

const refreshToken = async (refreshToken: string) => {
  if (!config.jwt.refresh_token_secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  let decoded;
  try {
    decoded = jwtHelper.verifyToken(refreshToken, config.jwt.refresh_token_secret as Secret);
  } catch (err) {
    throw new Error("Invalid refresh token");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: decoded?.id,
      status: UserStatus.ACTIVE,
    },
  });

  if (!user) {
    throw new Error("Invalid refresh token");
  }
  const accessToken = jwtHelper.generateToken(
    { id: user.id, email: user.email, role: user.role },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expires_id as string
  );

  return {
    accessToken,
    refreshToken,
    needResetPassword: user.needResetPassword,
  };
};

const changePassword = async (
  user : JwtPayload,
  payload: {
    oldPassword: String;
    newPassword: String;
  }
) => {
  const userRecord = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!userRecord) {
    throw new ApiError(status.NOT_FOUND, "User not found");
  }

  const isPasswordValid = await bcrypt.compare(payload.oldPassword, userRecord.password);

  if (!isPasswordValid) {
    throw new Error("Invalid current password");
  }

  const hashedPassword = await bcrypt.hash(payload.newPassword, 10);

  await prisma.user.update({
    where: {
      id: user.id,
      status: UserStatus.ACTIVE,
    },
    data: {
      password: hashedPassword,
      needResetPassword: false,
    },
  });

  return {
    message: "Password changed successfully",
  };
};
export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
};
