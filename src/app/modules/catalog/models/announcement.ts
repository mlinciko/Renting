import { AnnouncementRentType } from "./announcement-rent-type";
import { IFamilyHouse } from "./family-house";
import { IHouse } from "./house.interface";
import { IOwner } from "./owner";

export interface IAnnouncement {
  closedDt: string,
  createdDt: string,
  description: string,
  id: number,
  imagePathList: string[],
  price: number,
  property: {
    area: number,
    owner: IOwner,
    id: number
    numberOfRooms: number,
    renovationType: string,
    status: string,
    house?: IHouse, 
    familyHouse?: IFamilyHouse,
  },
  status: string,
  top: boolean,
  type: AnnouncementRentType,
}