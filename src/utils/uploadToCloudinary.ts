import cloudinary from '../config/cloudinary'
import { Readable } from 'stream'

export async function uploadImageToCloudinary(fileBuffer: any) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      (error: any, result: any) => {
        if (error) {
          reject(error)
        } else {
          resolve(result.url)
        }
      }
    )
    const bufferStream = new Readable()
    bufferStream.push(fileBuffer)
    bufferStream.push(null)
    bufferStream.pipe(uploadStream)
  })
}
