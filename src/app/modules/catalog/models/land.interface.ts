import { IAddress } from "./address.interface"
import { IOwner } from "./owner"

export interface ILand {
  address: IAddress,
  area: number,
  id: number,
  oneLineAddress: string
  owner: IOwner,
  propertyType: string,
  status: string
}