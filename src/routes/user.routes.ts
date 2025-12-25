import { Router } from 'express'
import * as userController from '../controllers/user.controller'

const userRoutes = Router()

userRoutes.get('/all', userController.getAllUsers)

export default userRoutes
