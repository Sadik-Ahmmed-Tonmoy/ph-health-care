import { UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import { fileUploader } from "../../../helpers/fileUploader";

const createAdmin = async (req: any) => {
 const file = req.file;
 if (file) {
    const uploadResult = await fileUploader.uploadToCloudinary(file);
    req.body.data.admin.profilePhoto = uploadResult?.secure_url;
  }
  


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

export const userService = {
  createAdmin,
};
