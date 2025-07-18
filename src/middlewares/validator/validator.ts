import { NextFunction, Response, Request } from 'express'
import { ErrorResponse } from '../../utils/Response'
import { HttpCodes, ExitCodes } from '../../config/Errors'
import { validationResult } from 'express-validator'
import { uploadImageToCloudinary } from '../../utils/uploadToCloudinary'
/**
 * Middleware to validate request data using `express-validator`.
 * This middleware must be used after all validation middlewares or as the last middleware before handling the request.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export async function validator(req: Request, res: Response, next: NextFunction) {
  try {
    console.log('validator function')
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        console.error('Validation errors:', JSON.stringify(error))
      })
      const errorMessages = errors
        .array()
        .map((error) => error.msg)
        .join(', ')

      const errorMessage = ExitCodes.ERROR_INVALID_INPUT.message.replace('{input}', errorMessages)

      return ErrorResponse(
        res,
        HttpCodes.BadRequest.code,
        ExitCodes.ERROR_INVALID_INPUT.type,
        errorMessage
      )
    }

    if (req.file) {
      console.log('req is going to be sent to cloudinary')
      const imgUrl = await uploadImageToCloudinary(req.file.buffer)
      req.body.imgUrl = imgUrl
    }

    if (req.files && Array.isArray(req.files)) {
      console.log('(multi files) req is going to be sent to cloudinary')

      const imagesUrls = await Promise.all(
        req.files.map(async (file: Express.Multer.File) => {
          const imgUrl = await uploadImageToCloudinary(file.buffer)
          return imgUrl
        })
      )

      req.body.images = imagesUrls
    }
    next()
  } catch (err: any) {
    console.error(err)
    return ErrorResponse(
      res,
      HttpCodes.InternalServerError.code,
      'something went wrong',
      `something went wrong err : ${err.message}`
    )
  }
}
