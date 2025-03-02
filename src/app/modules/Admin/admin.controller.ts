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
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.name || "Error in fetching admins",
      error: error,
    });
  }
};

export const AdminController = {
  getAllAdminsFromDB,
};
