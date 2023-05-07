import { Component, OnInit } from '@angular/core';
import { CatalogRootComponent } from 'src/app/modules/catalog/components/catalog-root/catalog-root.component';
import { DefaultAnnouncementService } from 'src/app/modules/catalog/services/announcement-init';
import { AnnouncementService } from 'src/app/modules/catalog/services/announcement.service';

@Component({
  selector: 'app-my-announcements',
  templateUrl: './my-announcements.component.html',
  styleUrls: ['./my-announcements.component.scss'],
  providers: [DefaultAnnouncementService]
})
export class MyAnnouncementsComponent extends CatalogRootComponent {

  override getAnnouncements(): void {
    this.announcement.getAnnouncementsOfCurrentUser()
    .subscribe(
      (res) => this.announcements = res
    )
  }

}
