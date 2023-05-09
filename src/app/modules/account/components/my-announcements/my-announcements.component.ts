import { Component } from '@angular/core';
import { AllComponent } from 'src/app/modules/catalog/components/all/all.component';
import { DefaultAnnouncementService } from 'src/app/modules/catalog/services/announcement-init';

@Component({
  selector: 'app-my-announcements',
  templateUrl: './my-announcements.component.html',
  styleUrls: ['./my-announcements.component.scss'],
  providers: [DefaultAnnouncementService]
})
export class MyAnnouncementsComponent extends AllComponent {

  override getAnnouncements(): void {
    this.announcement.getAnnouncementsOfCurrentUser()
    .subscribe(
      (res) => this.announcements = res
    )
  }

  createAnnouncement(): void {
    this.router.navigate(["/announcement/add"])
   }

}
