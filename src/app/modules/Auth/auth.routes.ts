import express from 'express';
import { authController } from './auth.controller';
import authGuard from '../../middlewares/authGuard';
import { UserRole } from '@prisma/client';


const router  = express.Router();

router.post('/login', authController.loginUser)
router.post('/refresh-token', authController.refreshToken)
router.post('/change-password',authGuard(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.DOCTOR, UserRole.PATIENT   ), authController.changePassword)


export const authRouter = router;
