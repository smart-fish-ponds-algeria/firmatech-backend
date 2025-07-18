import axios, { AxiosError } from 'axios'

async function convertImageUrlToBase64(imageUrl: string): Promise<string> {
  try {
    // Fetch the image as a buffer using axios
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })

    // Convert the buffer to a Base64 string
    const base64Image = Buffer.from(response.data).toString('base64')

    // Get the MIME type from the response header
    const mimeType = response.headers['content-type']

    // Return the Base64 string with data URI format (optional)
    return `data:${mimeType};base64,${base64Image}`
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Failed to convert image: ${error?.message}`)
    }
    throw new Error(`Failed to convert image: ${error}`)
  }
}

export default convertImageUrlToBase64
