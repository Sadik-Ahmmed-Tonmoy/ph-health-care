import express, { NextFunction, Request, Response } from "express";
import { AdminController } from "./admin.controller";
import { AnyZodObject, z } from "zod";
import validateRequest from "../../middlewares/validateRequest";
import { adminValidationSchema } from "./admin.validation";

const router = express.Router();

router.get("/", AdminController.getAllAdminsFromDB);
router.get("/:id", AdminController.getAdminById);
router.patch("/:id", validateRequest(adminValidationSchema.updateAdminValidationSchema), AdminController.updateAdmin);
router.delete("/:id", AdminController.deleteAdmin);
router.delete("/soft/:id", AdminController.softDeleteAdmin);

export const adminRoutes = router;
