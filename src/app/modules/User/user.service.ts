import { UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import { fileUploader } from "../../../helpers/fileUploader";
import { Request } from "express";



const createAdmin = async (req: Request) => {
  const file = req.file;
  if (file) {
    const uploadResult = (await fileUploader.uploadToCloudinary(file)) as { secure_url: string };
    req.body.admin.profilePhoto = uploadResult.secure_url;
  }

  const data = req.body;

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const userData = {
    name: data.admin.name,
    email: data.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };
  const adminData = data.admin;

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdAdmin = await transactionClient.admin.create({
      data: adminData,
    });
    return createdAdmin;
  });
  return result;
};

const createDoctor = async (req: Request) => {
  const file = req.file;
  if (file) {
    const uploadResult = (await fileUploader.uploadToCloudinary(file)) as { secure_url: string };
    req.body.doctor.profilePhoto = uploadResult.secure_url;
  }

  const data = req.body;

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const userData = {
    name: data.doctor.name,
    email: data.doctor.email,
    password: hashedPassword,
    role: UserRole.DOCTOR,
  };
  const doctorData = data.doctor;

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createDoctor = await transactionClient.doctor.create({
      data: doctorData,
    });
    return createDoctor;
  });
  return result;
};

export const userService = {
  createAdmin,
  createDoctor,
};
