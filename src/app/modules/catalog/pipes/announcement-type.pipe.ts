import { Pipe, PipeTransform } from '@angular/core';
import { AnnouncementRentType } from '../models/announcement-rent-type';

const rentTypes = {
  DAILY_RENT: "nigth",
  MONTHLY_RENT: "month",
  SELL: "sell",
}

@Pipe({
  name: 'announcementType'
})
export class AnnouncementTypePipe implements PipeTransform {

  transform(value: AnnouncementRentType): string {
    return rentTypes[value];
  }

}
