import { Component } from '@angular/core';
import { FamilyHouseAnnouncementService } from '../../services/announcement-init';
import { AllComponent } from '../all/all.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-family-house',
  templateUrl: './family-house.component.html',
  styleUrls: ['./family-house.component.scss'],
  providers: [FamilyHouseAnnouncementService]
})
export class FamilyHouseComponent extends AllComponent {

  override getAnnouncements(keywords?: string, callback?: any): void {
    this.announcement.getAnnouncementsByType(keywords)
    .subscribe(
      (res) => { 
        this.announcements = res; 
        this.filteredAnns = _.cloneDeep(this.announcements);
        
        if (callback) {
          callback.call();
        }
      }
    )
  }
}
