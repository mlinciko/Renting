import { Component } from '@angular/core';
import { LandAnnouncementService } from '../../services/announcement-init';
import { AllComponent } from '../all/all.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-land',
  templateUrl: './land.component.html',
  styleUrls: ['./land.component.scss'],
  providers: [LandAnnouncementService],
})
export class LandComponent extends AllComponent {

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
