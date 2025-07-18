import { ObjectId } from 'mongoose'

export interface WaterTankI {
  _id?: ObjectId
  details: WaterTankDetails
  responsible: ObjectId
  isActive: boolean
  fishDetails?: FishedDetails
  hasSick?: boolean
  //      id integer [primary key]
  //   name varchar
  //   details varchar
  // //   user_id integer [ref: > users.id] /
}

export interface WaterTankDetails {
  length: number
  width: number
  volume: number
}

export interface FishedDetails {
  total_fish_count?: number
  total_fish_sick?: number
  fish_lenght?: number
  fish_weight?: number
}
