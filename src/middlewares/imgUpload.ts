import multer from 'multer'
import { Request, Response, NextFunction } from 'express'
import { ErrorResponse } from '../utils/Response'
import { HttpCodes } from '../config/Errors'

const storage = multer.memoryStorage()

export const uploadFile = multer({ storage })

export async function handleImgUrlRequiredFile(req: Request, res: Response, next: NextFunction) {
  if (req.file) {
    next()
  } else {
    return ErrorResponse(res, HttpCodes.BadRequest.code, 'Image file missing')
  }
}
