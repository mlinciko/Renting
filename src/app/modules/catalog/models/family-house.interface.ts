import { IAddress } from "./address.interface"
import { IHousing } from "./housing-type"
import { IOwner } from "./owner"

export interface IFamilyHouse {
  area: number,
  house: {
    address: IAddress,
    buildingYear: number,
    houseMaterial: string,
    houseType: string,
    housingType: IHousing,
    id: number,
    numberOfFloors: number,
    oneLineAddress: string
    swimmingPool: boolean
  },
  id: number,
  numberOfRooms: number,
  owner: IOwner,
  propertyType: string,
  renovationType: string,
  status: string
}