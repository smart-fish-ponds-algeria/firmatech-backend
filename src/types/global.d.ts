import { ObjectId } from 'mongoose'

export interface AuthTokenPayload {
  _id: string
  email: string
  expires: any
}
export interface MaystroProductItem {
  id: string
  qte: number
}

export interface AuthAdminTokenPayload {
  _id: string
  email: string
  expires: any
  role: 'superAdmin'
}
export interface PublicSaleConfigPayload {
  _id: string
  name: string
}

export interface InviteTokenPayload {
  email: string
  storeRoleId?: string
  roleId?: string
  storeId: string | ObjectId
  exp: number
}
interface InvoiceTokenPayload {
  invoiceId: string
  type: 'print'
  timestamp: number
}

export namespace Types {
  interface ObjectId {
    toString(): string
    equals(id: string | ObjectId): boolean
  }
}

export interface DateIntervalQuery {
  startDate?: string | number | Date
  endDate?: string | number | Date
}

export interface DateInterval {
  startDate: Date
  endDate: Date
}

export interface Adress {
  commune: string
  code_postal: string
  full_adress: string
  wilaya_code: number
  wilaya: string
} // to remove

// export interface ForeignAddress {
//   buildingNumber: string
//   postalCode: string
//   city: string
//   addressDetails: string
//   fullAddress: string
// }
