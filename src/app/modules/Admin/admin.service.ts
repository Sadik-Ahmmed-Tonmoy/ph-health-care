import { Admin, Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import { adminSearchFields } from "./admin.constant";

const getAllAdminsFromDB = async (params: any, options: any) => {
  const { limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const andConditions: Prisma.AdminWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: adminSearchFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.AdminWhereInput = {
    AND: andConditions,
  };

  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.admin.count({
    where: whereConditions,
  });
  return {
    meta: {
      total,
      limit,
      skip,
    },
    data: result,
  };
};

const getAdminById = async (id: string) => {
  return await prisma.admin.findUnique({
    where: {
      id,
    },
  });
};

const updateAdmin = async (id: string, data: Partial<Admin>) => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });

  return await prisma.admin.update({
    where: {
      id,
    },
    data,
  });
};

const deleteAdmin = async (id: string) => {

  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  })

  const result = await prisma.$transaction(async (transactionClient) => {
    const adminDeletedData = await transactionClient.admin.delete({
      where: {
        id,
      },
    });

    const userDeletedData = await transactionClient.user.delete({
      where: {
        email: adminDeletedData.email,
      },
    });

    return {
      adminDeletedData,
      userDeletedData,
    };
  });

  return result;
};

export const AdminService = {
  getAllAdminsFromDB,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};
