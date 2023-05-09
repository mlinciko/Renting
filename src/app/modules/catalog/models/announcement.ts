import { AnnouncementRentType } from "./announcement-rent-type";
import { IAppartment } from "./appartment.interface";
import { IFamilyHouse } from "./family-house.interface";
import { ILand } from "./land.interface";

export interface IAnnouncement {
  closedDt: string,
  createdDt: string,
  description: string,
  id: number,
  imagePathList: string[],
  price: number,
  property: IAppartment & IFamilyHouse & ILand,
  status: string,
  top: boolean,
  type: AnnouncementRentType,
  propertyType: "APARTMENT" | "FAMILY_HOUSE" | "LAND",
}