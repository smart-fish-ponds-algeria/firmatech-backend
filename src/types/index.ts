import { ObjectId } from 'mongoose'

export type ObjectValues<T> = T[keyof T]

export type ItemTimeStamped<T extends object> = T & {
  createdAt: Date
  updatedAt: Date
}

export type PopulatedItem<T extends object> = T &
  ItemTimeStamped<T> & {
    _id: ObjectId
  }

export type ReferencedField<T extends object> = ObjectId | PopulatedItem<T>
