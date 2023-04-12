import { IHousing } from "./housing-type";

export interface IFamilyHouse {
  id: number,
  buildingYear: number,
  houseMaterial: string,
  housingType: IHousing,
  numberOfFloors: number,
  swimmingPool: boolean,
}