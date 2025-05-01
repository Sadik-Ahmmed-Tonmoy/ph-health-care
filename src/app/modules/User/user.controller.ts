import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
 try{
    const result = await userService.createAdmin(req);
    res.status(200).json({
      success: true,
      message: "Admin created successfully",
      data: result,
    });
 }catch(err){
    res.status(500).json({
      success: false,
      message: err.name || "Internal server error",
      error: err,
    });
 }
};
const createDoctor = async (req: Request, res: Response, next: NextFunction) => {
 try{
    const result = await userService.createDoctor(req);
    res.status(200).json({
      success: true,
      message: "Doctor created successfully",
      data: result,
    });
 }catch(err){
    res.status(500).json({
      success: false,
      message: err.name || "Internal server error",
      error: err,
    });
 }
};

export const userController = {
  createAdmin,
  createDoctor,
};
