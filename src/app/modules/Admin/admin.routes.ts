import express, { NextFunction, Request, Response } from "express";
import { AdminController } from "./admin.controller";
import { AnyZodObject, z } from "zod";
import validateRequest from "../../middlewares/validateRequest";
import { adminValidationSchema } from "./admin.validation";
import authGuard from "../../middlewares/authGuard";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get("/", authGuard(UserRole.SUPER_ADMIN, UserRole.ADMIN), AdminController.getAllAdminsFromDB);
router.get("/:id", authGuard(UserRole.SUPER_ADMIN, UserRole.ADMIN), AdminController.getAdminById);
router.patch(
  "/:id",
  authGuard(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(adminValidationSchema.updateAdminValidationSchema),
  AdminController.updateAdmin
);
router.delete("/:id", authGuard(UserRole.SUPER_ADMIN, UserRole.ADMIN), AdminController.deleteAdmin);
router.delete("/soft/:id", authGuard(UserRole.SUPER_ADMIN, UserRole.ADMIN), AdminController.softDeleteAdmin);

export const adminRoutes = router;
