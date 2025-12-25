import { Request, Response } from 'express'
import * as userService from '../services/user.service'
import { logger } from '../utils/logger'

export const getAllUsers = async (_: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.getAllUsers()

    logger.info(`Users ==> ${JSON.stringify(users)}`)

    res.status(200).json({
      status: 'success',
      data: users,
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Internal server error',
    })
  }
}
