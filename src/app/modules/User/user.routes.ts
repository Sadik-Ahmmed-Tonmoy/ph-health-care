import express, { NextFunction, Request, Response } from 'express'

import { UserRole } from '@prisma/client'
import { fileUploader } from '../../../helpers/fileUploader'
import authGuard from '../../middlewares/authGuard'
import { userController } from './user.controller'
import { userValidation } from './user.validation'

const router  = express.Router()

 


router.post('/',  authGuard(UserRole.SUPER_ADMIN, UserRole.ADMIN),
fileUploader.upload,
(req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createAdminValidation.parse(JSON.parse(req.body.data))
    return userController.createAdmin(req, res, next)
}
)

export  const userRoutes = router