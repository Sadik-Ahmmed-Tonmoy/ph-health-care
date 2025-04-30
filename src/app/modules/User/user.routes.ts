import express from 'express'

import { UserRole } from '@prisma/client'
import { fileUploader } from '../../../helpers/fileUploader'
import authGuard from '../../middlewares/authGuard'
import { userController } from './user.controller'

const router  = express.Router()

 


router.post('/',  authGuard(UserRole.SUPER_ADMIN, UserRole.ADMIN),
fileUploader.upload,
userController.createAdmin)

export  const userRoutes = router