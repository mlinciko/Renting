import { IAddress } from "./address.interface"
import { IHousing } from "./housing-type"
import { IOwner } from "./owner"

export interface IAppartment {
  apartmentNumber: string,
  area: number,
  floor: number,
  house: {
    address: IAddress,
    buildingYear: number,
    elevator: boolean,
    houseMaterial: string,
    houseType: string,
    housingType: IHousing,
    id: number,
    numberOfApartmentProperties: number,
    numberOfFloors: number,
    oneLineAddress: string
  },
  id: number,
  numberOfRooms: number,
  owner: IOwner,
  propertyType: string,
  renovationType: string,
  status: string
}