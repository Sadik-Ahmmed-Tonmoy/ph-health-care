import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body.email, req.body.password);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});


export const authController ={
    loginUser
}