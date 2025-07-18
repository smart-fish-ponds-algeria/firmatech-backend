import cloudinary from 'cloudinary'
import { Cloud_api_key, Cloud_api_secret, Cloudinary_Name } from './EnvProvider'

cloudinary.v2.config({
  cloud_name: Cloudinary_Name,
  api_key: Cloud_api_key,
  api_secret: Cloud_api_secret,
  secure: true,
})
export default cloudinary.v2
