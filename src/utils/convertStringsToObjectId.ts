import { isValidObjectId, ObjectId } from 'mongoose'
import { Types } from 'mongoose'

type ObjectIdLike = string | ObjectId

export function convertToObjectId(item: ObjectIdLike): ObjectId
export function convertToObjectId(items: ObjectIdLike[]): ObjectId[]

export function convertToObjectId(
  itemOrItems: ObjectIdLike | ObjectIdLike[]
): ObjectId | ObjectId[] {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.map((item) => convertToObjectId(item))
  }

  if (!isValidObjectId(itemOrItems)) {
    throw new Error(`Invalid ObjectId: ${itemOrItems}`)
  }

  return typeof itemOrItems === 'string'
    ? (new Types.ObjectId(itemOrItems) as unknown as ObjectId)
    : (itemOrItems as unknown as ObjectId)
}
