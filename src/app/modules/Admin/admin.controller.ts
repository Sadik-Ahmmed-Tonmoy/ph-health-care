import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";



const getAllAdminsFromDB = async (req: Request, res: Response) => {
  try {
    const filter = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const result = await AdminService.getAllAdminsFromDB(filter, options);
    res.status(200).json({
      success: true,
      message: "Admins fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.name || "Error in fetching admins",
      error: error,
    });
  }
};


 const getAdminById = async (req: Request, res: Response) => {
  try {
    const adminId = req.params.id;
    const result = await AdminService.getAdminById(adminId);
    res.status(200).json({
      success: true,
      message: "Admin fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.name || "Error in fetching admin",
      error: error,
    });
  }
 }


 const updateAdmin = async (req: Request, res: Response) => {
  try {
    const adminId = req.params.id;
    const data = req.body;
    const result = await AdminService.updateAdmin(adminId, data);
    res.status(200).json({
      success: true,
      message: "Admin updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.name || "Error in updating admin",
      error: error,
    });
  }
 }

 const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const adminId = req.params.id;
    await AdminService.deleteAdmin(adminId);
    res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.name || "Error in deleting admin",
      error: error,
    });
  }
 }
export const AdminController = {
  getAllAdminsFromDB,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};
