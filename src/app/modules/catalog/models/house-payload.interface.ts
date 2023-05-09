import { propertyType } from "./property.type";

export interface IHousePayload {
  "addressId": number,
  "buildingYear": number,
  "elevator": boolean,
  "houseMaterialId": number,
  "housingType": propertyType,
  "numberOfFloors": number,
  "swimmingPool": boolean
}