import { Component } from '@angular/core';
import { ApartmentAnnouncementService } from '../../services/announcement-init';
import { AllComponent } from '../all/all.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-appartment',
  templateUrl: './appartment.component.html',
  styleUrls: ['./appartment.component.scss'],
  providers: [ApartmentAnnouncementService],
})
export class AppartmentComponent extends AllComponent {

  override getAnnouncements(keywords?: string, callback?: any): void {
    this.announcement.getAnnouncementsByType(keywords)
    .subscribe(
      (res) =>  { 
        this.announcements = res; 
        this.filteredAnns = _.cloneDeep(this.announcements);
        
        if (callback) {
          callback.call();
        }
      }
    )
  }

}
