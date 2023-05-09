import { AnnouncementRentType } from "./announcement-rent-type";

export interface IAnnouncementPayload {
  "description": string,
  "price": number,
  "propertyId"?: number,
  "type": AnnouncementRentType
  "status"?: string
}