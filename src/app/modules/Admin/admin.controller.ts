import { NextFunction, Request, RequestHandler, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import catchAsync from "../../../shared/catchAsync";



const getAllAdminsFromDB = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  const result = await AdminService.getAllAdminsFromDB(filter, options);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admins fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getAdminById = catchAsync(async (req: Request, res: Response) => {
  const adminId = req.params.id;
  const result = await AdminService.getAdminById(adminId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin fetched successfully",
    data: result,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const adminId = req.params.id;
  const data = req.body;
  const result = await AdminService.updateAdmin(adminId, data);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin updated successfully",
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const adminId = req.params.id;
  const result = await AdminService.deleteAdmin(adminId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin deleted successfully",
    data: result,
  });
});
const softDeleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const adminId = req.params.id;
  const result = await AdminService.softDeleteAdminFromDB(adminId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin deleted successfully",
    data: result,
  });
});
export const AdminController = {
  getAllAdminsFromDB,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  softDeleteAdmin,
};
