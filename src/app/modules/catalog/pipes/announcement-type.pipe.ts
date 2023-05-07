import { Pipe, PipeTransform } from '@angular/core';
import { AnnouncementRentType } from '../models/announcement-rent-type';
import { rentTypes } from '../models/rent-types';

@Pipe({
  name: 'announcementType'
})
export class AnnouncementTypePipe implements PipeTransform {

  transform(value: AnnouncementRentType): string {
    return rentTypes[value].code;
  }

}
