import { ObjectId } from 'mongoose'

export default function isItemPopulated<T>(
  item: T | ObjectId | null | undefined,
  field: keyof T
): item is T {
  if (item && typeof item === 'object' && field in item) return true

  return false
}
